import styled from "styled-components";
import { HomeButton } from "../Home/Home.styled";

export const Wrapper = styled.div`
  margin: 0 auto;
  background-color: rgba(227, 119, 0, 0.5);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const TitleStyled = styled.h1`
  font-size: 41px;
  letter-spacing: 13px;
  padding-top: 30px;
  padding-bottom: 50px;
  text-align: center;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 80px auto;
  max-width: 1160px;
`;

export const TotalPriceSyled = styled.p`
  font-size: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 30px;
  margin-right: 120px;
  text-align: end;
`;

export const CartButton = styled(HomeButton)`
  width: 200px;
  margin: 0px;
`;
