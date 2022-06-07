import Icon from "@ant-design/icons";
import styled from "styled-components";

export const HeaderBackground = styled.div`
  background-color: #292929;
  width: 100vw;
`;

export const Wrapper = styled.div`
  display: flex;
  background-color: #292929;
  align-items: center;
  height: 130px;
  margin: 0px 15vw;
`;

export const Slogan = styled.div`
  margin: 10px 0 10px 30px;
  float: left;
  border-left: #fff 1px solid;
  font: 12px/22px Arial, Helvetica, sans-serif;
  color: #fff;
  text-align: center;
  height: 35px;
  font-size: 22px;
  // width: 300px; 
  padding: 1vh 26vw 25px 1vw;
`;

export const SocialNetworksBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
  margin: 10px 0;
`;


export const IconBase = styled(Icon)`
  font-size: 25px;
  color: ${({ color }) => color};
  margin-top: 10px;
`;

export const LogOut = styled(IconBase)`
  font-size: 35px;
  color: #fff;
  margin-left: 10vw;
  cursor: pointer;
  margin-top: 3px;
`;

export const HeaderImage = styled.img`
  alt: "Footer_image";
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
