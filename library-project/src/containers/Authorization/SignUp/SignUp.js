import React, {useState,useEffect} from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
  GlobalWrapper,
  Wrapper,
  TitleStyled,
  SignUpButton,
  FormikStyled,
  FormStyled,
  InputWrapper,
  InputComponent,
  FormikErrorMessage,
  InputContainer,
  AlreadyMemberWrapper,
  SignInText,
} from "./SignUp.styled";
import { getAllUsers, postUser } from "../../utils/Api";

const SignUp = () => {
  let history = useHistory();
  let myStorage = window.localStorage;
  const toSignIn = () => {
    history.push("/login");
  };

  const checkIfUserExist = async (email ) => {
    const users= await getAllUsers();
    const user=users.find((el)=>el.email===email);
    if(user) { 
      return true
    }
    return false
  }
  const createUser = async ({ status,  email, firstName, lastName , password }) =>{
        
    // myStorage.setItem(`ActiveUser`, email);
    // myStorage.setItem("isAuthorized", true);
  //  console.log({  status, email, firstName, lastName , password })
    const responseWithCreds= await postUser({ status , email, firstName, lastName, password});
    // console.log(responseWithCreds);
    return responseWithCreds;
  }
  const [signUpError, setSignUpError] = useState("")
  const [statusState, setStatus] = useState("")

  useEffect(() => {
    console.log(signUpError)
  }, [setSignUpError])
  return (
    <GlobalWrapper>
      <Wrapper>
        <TitleStyled>Register the new account</TitleStyled>
        <FormikStyled
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            status:"librarian",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
           
            email: Yup.string()
              .email("Invalid email address")
              .required("Please input a value"),
            password: Yup.string()
              .min(3, "Must be at least 3 characters")
              .required("Please input a value"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Please input a value"),
          })}
          onSubmit={ async ({  status, email, firstName, lastName , password },{setSubmitting}) => {
            const userFound = await checkIfUserExist(email);
            console.log(userFound)
            if(userFound) {
            setSignUpError("User Existing");
            setSubmitting(false);
          }
          else{
            setSignUpError("");
            const statusToPass=statusState?statusState:status
              const responseWithCreds = await createUser({ status:statusToPass,  email, firstName, lastName, password })
              history.push("/login");
              window.reload();
          }
           
          }}
        >
          {({ handleSubmit }) => (
            <FormStyled onSubmit={handleSubmit}>
              <InputWrapper>
             
                <b>status:</b>
                <select as="select" name="status" onChange={(e)=>{setStatus(e.target.value)}}
                style={{height:"20px",minWidth: "25vw",
                  borderRadius: "8px",
                  maxWidth: "40vw"}}>       
             <option value="librarian">Librarian</option>
             <option value="cultural figure">Cultural figure</option> 
             <option value="regular customer">Regular customer</option>
           </select>
                <InputContainer>
                  <b>First Name:</b>
                  <InputComponent
                    title="Firstname"
                    name="firstName"
                    status="text"
                  />
                  <FormikErrorMessage name="firstName" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Last Name:</b>
                  <InputComponent
                    title="Lasttname"
                    name="lastName"
                    status="text"
                  />
                  <FormikErrorMessage name="lastName" component="div" />
                </InputContainer>
               
                <InputContainer>
                  <b>Email:</b>
                  <InputComponent title="Email" name="email" status="email" />
                  <FormikErrorMessage name="email" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Password:</b>
                  <InputComponent
                  // onChange={(e)=>setPassword(e.target.value)}
                    title="Password"
                    name="password"
                    status="password"
                  />
                  <FormikErrorMessage name="password" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Confirm Password:</b>
                  <InputComponent
                    title="Confirm password"
                    name="confirmPassword"
                    status="password"
                  />
                  <FormikErrorMessage name="confirmPassword" component="div" />
                </InputContainer>
              </InputWrapper>
              <AlreadyMemberWrapper>
              {signUpError==="User Existing"?<h1>This User already exist, please create another one or sign IN</h1>:<></>}
                <SignInText onClick={toSignIn}>Sign in</SignInText>
              </AlreadyMemberWrapper>
              <SignUpButton status="submit"  >SIGN ME UP</SignUpButton>
            </FormStyled>
          )}
        </FormikStyled>
      </Wrapper>
    </GlobalWrapper>
  );
};

export default SignUp;
