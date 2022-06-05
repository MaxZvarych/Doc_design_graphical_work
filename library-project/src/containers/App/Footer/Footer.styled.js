import Icon from "@ant-design/icons";
import styled from "styled-components";

export const FooterBackground = styled.div`
  background-color: #000000;
  width: 100vw;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000000;
  align-items: center;
  margin: 0px 15vw;
  p {
    font: Arial, Helvetica, sans-serif;
    color: #8f8b8c;
  }
  a {
    color: #e37700;
    text-decoration: none;
  }
`;

export const Slogan = styled.div`
  margin: 10px 0 10px 30px;
  float: left;
  border: #e37700 6px double;
  font: Arial, Helvetica, sans-serif;
  color: #8f8b8c;
  text-align: center;
  padding: 10px;
  font-size: 20px;
  width: 30vw;
  text-align: center;
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
`;

export const FooterImage = styled.img`
  alt: "Footer_image";
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-top: 3vh;
`;
