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
import { getAllUsers } from "../../utils/Api";

const LogIn = () => {
  let history = useHistory();
  let myStorage = window.localStorage;
  const toSignUp = () => {
    history.push("/signup");
  };

  const checkIfUserExist = async (username, password) => {
    const users= await getAllUsers();
    const user=users.find((el)=>`${el.firstName} ${el.lastName}`===username);
    console.log(user)
    myStorage.setItem(`ActiveUser`, user.email);
    if(user) {
      console.log(user.id)
      myStorage.setItem(`${user.firstName} ${user.lastName}`, password);
      return true
    }
    return false
  }
  return (
    <GlobalWrapper>
      <Wrapper>
        <TitleStyled>Log into your account</TitleStyled>
        <FormikStyled
          initialValues={{
            userName: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            userName: Yup.string()
              .min(3, "Must be at least 3 characters")
              .max(30, "Must be at most 30 characters")
              .required("Please input a value"),
            password: Yup.string()
              .min(3, "Must be at least 3 characters")
              .required("Please input a value"),
          })}
          onSubmit={({ userName, password }) => {
            if (myStorage.getItem(`${userName}`) === password) {
              async function logUserProps(){
              const users= await getAllUsers();
              const user=users.find((el)=>`${el.firstName} ${el.lastName}`===userName);
              myStorage.setItem(`ActiveUser`, user.email);
              myStorage.setItem("isAuthorized", true);
              history.push("/home");
              window.location.reload();
            }
              logUserProps();
            } 
            else if(checkIfUserExist(userName,password))
            {
              myStorage.setItem("isAuthorized", true);
              history.push("/home");
              window.location.reload();
            }
            else alert("You entered incorrect password");
          }}
        >
          {({ handleSubmit }) => (
            <FormStyled onSubmit={handleSubmit}>
              <InputWrapper>
                <InputContainer>
                  <b>Username:</b>
                  <InputComponent
                    title="Username"
                    name="userName"
                    type="text"
                  />
                  <FormikErrorMessage name="userName" component="div" />
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
