import React from "react";
import { useHistory } from "react-router-dom";
import {
  Wrapper,
  TitleStyled,
  TotalPriceSyled,
  CartButton,
  Footer,
} from "./Cart.styled";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import ReservedCartItem from "../../components/ReservedCartItem/ReservedCartItem";

const Cart = () => {
  let history = useHistory();
  const selector = useSelector((state) => state);

  const handleClick = () => {
    history.push(`/checkout`);
  };

  const backToCatalog = () => {
    history.push(`/catalog`);
  };

  return (
    <Wrapper>
      <TitleStyled>Shopping Cart</TitleStyled>
      {selector.orders.map((value) => {
        return <ReservedCartItem value={value} />;
      })}

      <TotalPriceSyled>Total Price: {selector.totalPrice} UAH</TotalPriceSyled>
      <Footer>
        <CartButton onClick={backToCatalog}>Back to Catalog</CartButton>
        <CartButton onClick={handleClick}>Continue</CartButton>
      </Footer>
    </Wrapper>
  );
};

export default Cart;
