import styled from "styled-components";
import background1 from "../../../Icons/home-background1.jpg";
import { HomeButton } from "../../Home/Home.styled";
import { Formik } from "formik";
import { Form, Field, ErrorMessage } from "formik";

export const GlobalWrapper = styled.div`
  background: url(${background1}) repeat-x;
  max-height: 80vh;
  width: 100vw;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  max-height: 80vh;
  background-color: rgba(227, 119, 0, 0.5);
`;

export const NotMemberWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  width: 26vw;
  margin-top: 10vh;
`;

export const TitleStyled = styled.h1`
  font-size: 35px;
  letter-spacing: 7px;
  padding-top: 30px;
  padding-bottom: 50px;
  text-align: center;
  align-self: center;
`;

export const ParagraphStyled = styled.p`
  font-weight: 600;
  align-self: center;
  margin: auto 0;
`;

export const SignUpText = styled(ParagraphStyled)`
  color: #0d03f4;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const SignInButton = styled(HomeButton)`
  width: 200px;
  margin: 0px;
`;

export const FormikStyled = styled(Formik)`
  align-self: flex-start;
`;

export const FormStyled = styled(Form)`
  padding-bottom: 10px;
  align-self: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 65vh;
  box-shadow: 0 3px 2px #201a1a;
  border: 6px rgb(227, 119, 0) double;
  padding: 10px;
  border-radius: 5px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10vh;
`;

export const InputComponent = styled(Field)`
  min-width: 25vw;
  border-radius: 8px;
  max-width: 40vw;
`;

export const FormikErrorMessage = styled(ErrorMessage)`
  min-width: 25vw;
  max-width: 40vw;
  border-radius: 10px;
  background-color: #db678a;
  opacity: 85%;
  color: #000000;
  /* align-self: center; */
`;
