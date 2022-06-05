import styled from "styled-components";
import { HomeButton } from "../Home/Home.styled";
import { Formik } from "formik";
import { Form, Field, ErrorMessage } from "formik";

export const CheckoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(227, 119, 0, 0.5);
`;

export const TitleStyled = styled.h1`
  font-size: 41px;
  letter-spacing: 13px;
  padding-top: 30px;
  padding-bottom: 50px;
  text-align: center;
  align-self: center;
`;

export const PopupWrapper = styled.div`
  position: absolute;
  display: none;
  width: 40%;
  bottom: 0;
  background-color: #db678a;
  opacity: 85%;
  color: #000000;
  align-self: center;
`;

export const PopupContent = styled.div`
  width: fit-content;
  margin: 2px auto;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const ParagraphStyled = styled.p`
  align-self: center;
  margin: auto 0;
`;

export const ClosePopup = styled.span`
  right: 0;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const CheckoutButton = styled(HomeButton)`
  width: 200px;
  margin: 0px;
`;

export const PopupButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormikStyled = styled(Formik)`
  align-self: center;
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
  height: 55vh;
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
