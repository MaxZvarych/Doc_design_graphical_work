import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { CenterContainer, MessageInfo } from "./LoadElement.styled";

const LoadElement = ({
  title = "Not Found",
  description = "Please try again later",
}) => {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    let myTimeout = setTimeout(() => {
      setLoad(true);
    }, 15000);
    console.log(load);
    return function cleanUp() {
      clearTimeout(myTimeout);
    };
  }, []);
  if (!load) {
    return <Spinner />;
  }
  return (
    <CenterContainer>
      <MessageInfo>{title}</MessageInfo>
      <MessageInfo>{description}</MessageInfo>
    </CenterContainer>
  );
};

export default LoadElement;
