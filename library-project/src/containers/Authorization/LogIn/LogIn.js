import React from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
  GlobalWrapper,
  Wrapper,
  TitleStyled,
  SignInButton,
  FormikStyled,
  FormStyled,
  InputWrapper,
  InputComponent,
  FormikErrorMessage,
  InputContainer,
  NotMemberWrapper,
  SignUpText,
  ParagraphStyled,
} from "./LogIn.styled";
import { getAllUsers, signIn } from "../../utils/Api";

const LogIn = () => {
  let history = useHistory();
  let myStorage = window.localStorage;
  const toSignUp = () => {
    history.push("/signup");
  };

  const checkIfUserExist = async (email) => {
    const users = await getAllUsers();
    const user = users.find((el) => el.email === email);
    myStorage.setItem(`ActiveUser`, user.id);
    if (user) {
      console.log(user.id);
      return true;
    }
    return false;
  };
  return (
    <GlobalWrapper>
      <Wrapper>
        <TitleStyled>Log into your account</TitleStyled>
        <FormikStyled
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .min(3, "Must be at least 3 characters")
              .max(30, "Must be at most 30 characters")
              .required("Please input a value"),
            password: Yup.string()
              .min(3, "Must be at least 3 characters")
              .required("Please input a value"),
          })}
          onSubmit={({ email, password }) => {
            console.log(email, password);
            async function logUserProps(email, password) {
              const credentials = await signIn({ email, password });
              const userExist = await checkIfUserExist(email);
              if (credentials && userExist) {
                myStorage.setItem(`AccessToken`, credentials.access);
                myStorage.setItem(`RefreshToken`, credentials.refresh);
                myStorage.setItem("isAuthorized", true);
                history.push("/home");
                window.location.reload();
              } else {
                console.log(`You entered incorrect credentials`);
                alert(`You entered incorrect credentials`);
              }
            }
            logUserProps(email, password);

            //  alert("You entered incorrect password");
          }}
        >
          {({ handleSubmit }) => (
            <FormStyled onSubmit={handleSubmit}>
              <InputWrapper>
                <InputContainer>
                  <b>Email:</b>
                  <InputComponent title="email" name="email" type="text" />
                  <FormikErrorMessage name="email" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Password:</b>
                  <InputComponent
                    title="Password"
                    name="password"
                    type="password"
                  />
                  <FormikErrorMessage name="password" component="div" />
                </InputContainer>
              </InputWrapper>
              <NotMemberWrapper>
                <ParagraphStyled>Not a member?</ParagraphStyled>
                <SignUpText onClick={toSignUp}>Sign up</SignUpText>
              </NotMemberWrapper>
              <SignInButton onSubmit={handleSubmit}>LOGIN ME</SignInButton>
            </FormStyled>
          )}
        </FormikStyled>
      </Wrapper>
    </GlobalWrapper>
  );
};

export default LogIn;
