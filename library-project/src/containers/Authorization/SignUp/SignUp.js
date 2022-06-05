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

  const checkIfUserExist = async (id, password) => {
    const users= await getAllUsers();
    const user=users.find((el)=>el.id===id);
    if(user) {
      myStorage.setItem(`${user.firstName} ${user.lastName}`, password);
      return true
    }
    return false
  }
  const createUser = async ({ id, type, phoneNumber, location, email, firstName, lastName , password }) =>{
    myStorage.setItem(`${firstName} ${lastName}`, password);
    myStorage.setItem(`ActiveUser`, id);
    myStorage.setItem("isAuthorized", true);
   console.log({ id, type, phoneNumber, location, email, firstName, lastName , password })
    const createdUser= await postUser({id, type, phoneNumber, location, email, firstName, lastName});
    console.log(createdUser);
    return createdUser;
  }
  const [signUpError, setSignUpError] = useState("")
  const [typeState, setType] = useState("")

  useEffect(() => {
    console.log(signUpError)
  }, [setSignUpError])
  return (
    <GlobalWrapper>
      <Wrapper>
        <TitleStyled>Register the new account</TitleStyled>
        <FormikStyled
          initialValues={{
            id:"",
            email: "",
            firstName: "",
            lastName: "",
            type:"admin",
            phoneNumber:"",
            location:"",
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
          onSubmit={ async ({ id, type, phoneNumber, location, email, firstName, lastName , password },{setSubmitting}) => {
            const userFound = await checkIfUserExist(id,password);
            console.log(userFound)
            if(userFound) {
            setSignUpError("User Existing");
            setSubmitting(false);
          }
          else{
            setSignUpError("");
            const typeToPass=typeState?typeState:type
              await createUser({ id,type:typeToPass , phoneNumber, location, email, firstName, lastName, password })
              history.push("/home");
              window.location.reload();
          }
           
          }}
        >
          {({ handleSubmit }) => (
            <FormStyled onSubmit={handleSubmit}>
              <InputWrapper>
              <InputContainer>
                  <b>Id:</b>
                  <InputComponent title="ID" name="id" type="id" 
                  />
                  <FormikErrorMessage name="id" component="div" />
                </InputContainer>
                <b>Type:</b>
                <select as="select" name="type" onChange={(e)=>{setType(e.target.value)}}
                style={{height:"20px",minWidth: "25vw",
                  borderRadius: "8px",
                  maxWidth: "40vw"}}>       
             <option value="admin">admin</option>
             <option value="user">user</option>
           </select>
                <InputContainer>
                  <b>First Name:</b>
                  <InputComponent
                    title="Firstname"
                    name="firstName"
                    type="text"
                  />
                  <FormikErrorMessage name="firstName" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Last Name:</b>
                  <InputComponent
                    title="Lasttname"
                    name="lastName"
                    type="text"
                  />
                  <FormikErrorMessage name="lastName" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Phone Number:</b>
                  <InputComponent
                    title="Phone Number"
                    name="phoneNumber"
                    type="text"
                  />
                  <FormikErrorMessage name="lastName" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Location:</b>
                  <InputComponent
                    title="Location"
                    name="location"
                    type="text"
                  />
                  <FormikErrorMessage name="lastName" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Email:</b>
                  <InputComponent title="Email" name="email" type="email" />
                  <FormikErrorMessage name="email" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Password:</b>
                  <InputComponent
                  // onChange={(e)=>setPassword(e.target.value)}
                    title="Password"
                    name="password"
                    type="password"
                  />
                  <FormikErrorMessage name="password" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Confirm Password:</b>
                  <InputComponent
                    title="Confirm password"
                    name="confirmPassword"
                    type="password"
                  />
                  <FormikErrorMessage name="confirmPassword" component="div" />
                </InputContainer>
              </InputWrapper>
              <AlreadyMemberWrapper>
              {signUpError==="User Existing"?<h1>This User already exist, please create another one or sign IN</h1>:<></>}
                <SignInText onClick={toSignIn}>Sign in</SignInText>
              </AlreadyMemberWrapper>
              <SignUpButton type="submit"  >SIGN ME UP</SignUpButton>
            </FormStyled>
          )}
        </FormikStyled>
      </Wrapper>
    </GlobalWrapper>
  );
};

export default SignUp;
