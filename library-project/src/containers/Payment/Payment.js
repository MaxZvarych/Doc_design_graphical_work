/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Wrapper,
  InfoWrapper,
  ButtonsWrapper,
  PaymentImage,
  Description,
  SecurityplaceHolderNamecvv,
  DescriptionFirst,
  ButtonscvvWrapper,
  PaymentButton,
  FormWrapper,
} from "./Payment.styled";
import security from "../../Icons/background2.jpg";
import { updateUser, getUser } from "../utils/Api";

const Payment = () => {
  let myStorage = window.localStorage;
  let history = useHistory();

  const handleClick = () => {
    history.push(`/catalog`);
  };

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("341");
  const [balance, setBalance] = useState(300);
  const [userId, setUserId] = useState("");
  const [placeHolderName, setPlaceHolderName] = useState(
    "Maksym-Fedir Zvarych"
  );
  const [receiver, setReceiver] = useState("NiceGuy");
  const [expirationDate, setExpirationDate] = useState("22.2.2222");

  useEffect(() => {
    async function fillUserData() {
      const userIdentifier = myStorage.getItem(`ActiveUser`);
      const user = await getUser(userIdentifier);
      setBalance(Number(user.balance));
      setUserId(userIdentifier);
    }
    fillUserData();
  }, []);

  async function submitData(event) {
    event.preventDefault();
    const payment = await updateUser({ id: userId, balance });
    if (payment) {
      console.log(payment);
      history.push(`/success`);
      window.location.reload();
    } else {
      history.push("/home");
      window.location.reload();
    }
  }

  const text = "Here you can fill in your payment data to rent some book";
  return (
    <Wrapper>
      <InfoWrapper>
        <PaymentImage
          src={security}
          alt="Logo_image"
          width="400px"
          height="400px"
        />
        <Description>
          <DescriptionFirst>
            <SecurityplaceHolderNamecvv>{text}</SecurityplaceHolderNamecvv>
          </DescriptionFirst>
          <FormWrapper>
            <h1>Please fill in your payment data:</h1>
            <form onSubmit={(e) => submitData(e)}>
              <label> Card Number</label>

              <input
                onChange={(e) => setCardNumber(e.target.value)}
                name="bookcardNumber"
                placeHolderName="text"
                placeholder=" cardNumber"
                value={cardNumber}
              />

              <label>Expiration Date</label>
              <input
                onChange={(e) => setExpirationDate(e.target.value)}
                name="expirationDateID"
                placeHolderName="string"
                placeholder="expirationDate"
              />

              <label>Payment's receiver(must be same as book owner)</label>

              <input
                onChange={(e) => {
                  setReceiver(e.target.value);
                }}
                name="receiver"
                placeholder="receiver"
                placeHolderName="number"
              />

              <label>CVV</label>

              <input
                onChange={(e) => setCvv(e.target.value)}
                name=" cvv"
                placeHolderName="number"
                placeholder="  cvv"
              />

              <label>Amount to add</label>

              <input
                onChange={(e) =>
                  setBalance(Number(balance) + Number(e.target.value))
                }
                name="balance"
                placeHolderName="number"
                placeholder="balance"
                type="number"
              />

              <label>PlaceHolder Name(name on your card)</label>

              <input
                onChange={(e) => setPlaceHolderName(e.target.value)}
                name="placeHolderName"
                placeHolderName="string"
                placeholder="placeHolderName"
              />

              <button placeHolderName="submit" type="submit">
                Submit
              </button>
            </form>
          </FormWrapper>
        </Description>
      </InfoWrapper>
      <ButtonscvvWrapper>
        <ButtonsWrapper>
          <PaymentButton onClick={handleClick}>Go back</PaymentButton>
        </ButtonsWrapper>
      </ButtonscvvWrapper>
    </Wrapper>
  );
};

export default Payment;
