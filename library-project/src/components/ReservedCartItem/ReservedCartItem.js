import React, { useEffect, useState } from "react";
import {
  CardStyled,
  MinusStyled,
  PlusStyled,
  CardImage,
  TextStyled,
  StyledCounter,
  CloseOutlinedStyled,
  ButtonSmall,
} from "./ReservedCartItem.styled";

import { useDispatch } from "react-redux";
import { deleteItem, updateItem } from "../../containers/utils/Redux/Action";
import security from "../../Icons/background2.jpg";

const ReservedCardItem = ({ value }) => {
  const [element, setElement] = useState(value);
  const dispatch = useDispatch();
  useEffect(() => {
    setElement(value);
  }, [value]);
  const reduceItemNumber = () => {
    if (element.number === 1) {
      return;
    }
    const newElement = {
      ...element,
      number: element.number - 1,
      price: (element.price / element.number) * (element.number - 1),
    };
    setElement(newElement);
    dispatch(updateItem(newElement));
  };

  const increaseItemNumber = () => {
    if (element.number === 20) {
      return;
    }
    const newElement = {
      ...element,
      number: element.number + 1,
      price: (element.price / element.number) * (element.number + 1),
    };
    setElement(newElement);
    dispatch(updateItem(newElement));
  };

  const removeElement = () => {
    dispatch(deleteItem(element));
  };

  return (
    <CardStyled>
      <CloseOutlinedStyled onClick={removeElement} />
      <CardImage alt="Security" src={security} />
      <TextStyled>{element.documentOwner}'s security</TextStyled>
      <StyledCounter>
        <ButtonSmall onClick={increaseItemNumber}>
          <PlusStyled />
        </ButtonSmall>
        <TextStyled>{element.number}</TextStyled>
        <ButtonSmall>
          <MinusStyled onClick={reduceItemNumber} />
        </ButtonSmall>
      </StyledCounter>
      <TextStyled>{element.price} UAH</TextStyled>
    </CardStyled>
  );
};

export default ReservedCardItem;
