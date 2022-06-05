import styled from "styled-components";
import background from "../../Icons/home-background1.jpg";

export const Wrapper = styled.div`
  /* background: url(${background}) no-repeat; */
  width: 100vw;
  /* height: 125vh; */

  p {
    font: 12px/22px Arial, Helvetica, sans-serif;
    color: #000000;
    max-width: 40vw;
  }
`;

export const Heading = styled.div`
  margin-top: 80px;
  background-color: rgba(227, 119, 0, 0.5);
  display: flex;
  justify-content: space-around;
`;

export const HeadingTextButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const HomeButton = styled.button`
  margin-top: 6vh;
  background-color: #f0ac01;
  box-shadow: 0 3px 2px #201a1a;
  border: 4px rgb(227, 119, 0) double;
  border-radius: 5px;
  width: 20vw;
  align-self: center;
  margin-bottom: 5vh;
  a {
    color: #000;
    text-decoration: none;
  }
`;

export const HomeImage = styled.img`
  alt: "Home_image";
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 50%;
  margin: 10px -30px 10px 0;
`;

export const CardWrapper = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* background-color: rgba(240, 172, 1, 0.5); */
  ul {
    /* background: none; */
    background-color: rgba(240, 172, 1, 0.55);
    box-shadow: 0 0 2px 0 #f0ac01;
    border-radius: 0 0 20px 20px;
    min-height: 70px;
    width: 300px;
    margin-bottom: -23px;
  }
`;
