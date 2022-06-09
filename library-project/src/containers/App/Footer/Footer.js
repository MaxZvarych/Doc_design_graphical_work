import React from "react";
import {
  FooterBackground,
  Wrapper,
  Slogan,
  IconBase,
  SocialNetworksBar,
  FooterImage,
} from "./Footer.styled";
import  {
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import logo from "../../../Icons/logo_books_1.png";

const Footer = () => {
  return (
    <FooterBackground>
      <Wrapper>
        <FooterImage src={logo} alt="Logo_image" height="130px" width="300px" />
        <Slogan>Clients choose us!</Slogan>
        <SocialNetworksBar>
          <a href="https://www.youtube.com/">
            <IconBase component={YoutubeOutlined} color="#FF0000" />
          </a>
          <a href="https://www.instagram.com/">
            <IconBase component={InstagramOutlined} color="#ffff" />
          </a>
          <a href="https://www.twitter.com/">
            <IconBase component={TwitterOutlined} color="#03A9F4" />
          </a>
          <a href="https://www.facebook.com/">
            <IconBase component={FacebookOutlined} color="#4267B2" />
          </a>
          <a href="https://www.LinkedIn.com/">
            <IconBase component={LinkedinOutlined} color="#007AB9" />
          </a>
        </SocialNetworksBar>
        <p>
          Phone: +1 800 559 6580 &nbsp; Email:{" "}
          <a href="#" className="link">
            info@bookstore.com
          </a>{" "}
          <br />
          © 2012 Security Group <br />
          All rights reserved
        </p>
      </Wrapper>
    </FooterBackground>
  );
};

export default Footer;
