import React from "react";
import { useHistory } from "react-router-dom";
import {
  CheckoutStyled,
  TitleStyled,
  Buttons,
  CheckoutButton,
  FormikStyled,
  FormStyled,
  InputWrapper,
  InputComponent,
  FormikErrorMessage,
  InputContainer,
} from "./Checkout.styled";
import * as Yup from "yup";

const Checkout = () => {
  let history = useHistory();

  const backToCart = () => {
    history.push(`/cart`);
  };

  const phoneRegExp =
    /^((\+38)?\(?\d{3}\)?[\s-]?(\d{7}|\d{3}[\s-]\d{2}[\s-]\d{2}|\d{3}-\d{4}))$/g;

  return (
    <CheckoutStyled>
      <TitleStyled>Checkout</TitleStyled>
      <FormikStyled
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(3, "Must be at least 3 characters")
            .max(30, "Must be at most 30 characters")
            .required("Please input a value"),
          lastName: Yup.string()
            .min(3, "Must be at least 3 characters")
            .max(30, "Must be at most 30 characters")
            .required("Please input a value"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Please input a value"),
          phone: Yup.string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("Please input a value"),
          address: Yup.string()
            .min(3, "Must be at least 3 characters")
            .max(30, "Must be at most 30 characters")
            .required("Please input a value"),
        })}
        onSubmit={(values) => {
          history.push("/success");
        }}
      >
        {({ handleSubmit }) => (
          <FormStyled onSubmit={handleSubmit}>
            <InputWrapper>
              <InputContainer>
                <b>First Name:</b>
                <InputComponent
                  title="First Name"
                  name="firstName"
                  type="text"
                />
                <FormikErrorMessage name="firstName" component="div" />
              </InputContainer>
              <InputContainer>
                <b>Last Name:</b>
                <InputComponent title="Last Name" name="lastName" type="text" />
                <FormikErrorMessage name="lastName" component="div" />
              </InputContainer>
              <InputContainer>
                <b>Email:</b>
                <InputComponent title="Email" name="email" type="email" />
                <FormikErrorMessage name="email" component="div" />
              </InputContainer>
              <InputContainer>
                <b>Phone number:</b>
                <InputComponent title="Phone Number" name="phone" type="text" />
                <FormikErrorMessage name="phone" component="div" />
              </InputContainer>
              <InputContainer>
                <b>Address:</b>
                <InputComponent title="Address" name="address" type="text" />
                <FormikErrorMessage name="address" component="div" />
              </InputContainer>
            </InputWrapper>
            <Buttons>
              <CheckoutButton onClick={backToCart}>Go Back</CheckoutButton>
              <CheckoutButton onClick={handleSubmit}>Continue</CheckoutButton>
            </Buttons>
          </FormStyled>
        )}
      </FormikStyled>
    </CheckoutStyled>
  );
};

export default Checkout;
