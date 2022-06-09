import React, { useState, useEffect } from "react";
import { CartContainer, ButtonSuccess } from "./Success.styled";
import { Result } from "antd";
import { useHistory } from "react-router-dom";
import { getAllBooks } from "../../utils/Api";

const Success = () => {
  let history = useHistory();

  return (
    <CartContainer>
      <Result
        status="success"
        title="Your order was successfully implemented!"
        subTitle="Order Number: 34534545645645. You can check your receipt on your e-mail."
        extra={[
          <>
            <h1>Your balance was successfully updated.</h1>
            <ButtonSuccess onClick={() => history.push("/catalog")}>
              Go to Catalog
            </ButtonSuccess>
          </>,
        ]}
      />
    </CartContainer>
  );
};

export default Success;
