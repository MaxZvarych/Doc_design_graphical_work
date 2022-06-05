import styled from "styled-components";
import background from "../../Icons/nav.jpg";
import background1 from "../../Icons/home-background1.jpg";

export const GlobalWrapper = styled.div`
  background: url(${background1}) repeat-y;
  min-height: 80vh;
  width: 100vw;
`;

export const SecondGlobalWrapper = styled(GlobalWrapper)`
  min-height: 10vh;
`;

export const LinkingWrapper = styled.div`
  .selected {
    :after {
      content: "";
      display: block;
      position: absolute;
      bottom: -5px;
      left: 50%;
      height: 16px;
      border-left: 1px solid black;
    }
  }
  ul {
    background: url(${background}) repeat-x;
    box-shadow: 0 3px 2px #201a1a;
    border-radius: 10px;
    min-height: 70px;
    width: 70vw;
    list-style-type: none;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }
  li {
    display: inline-block;
    padding: 5px 5px 10px 5px;
    position: relative;
    font-weight: bold;
    margin: 10px 30px;
    font-size: 24px;
    font-weight: 100;
    a {
      color: black;
      text-decoration: none;
    }
  }
`;
