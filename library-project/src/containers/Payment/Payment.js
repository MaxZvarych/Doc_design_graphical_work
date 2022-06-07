import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Wrapper,
  InfoWrapper,
  ButtonsWrapper,
  PaymentImage,
  Description,
  SecurityText,
  SecurityplaceHolderNamecvv,
  DescriptionFirst,
  ButtonscvvWrapper,
  PaymentButton,
  FormWrapper
} from "./Payment.styled";
import security from "../../../Icons/background2.jpg"; 
import {  getBook, postRecord } from "../../utils/Api";

const Payment = () => {
  const findBook = async(id) => {
    const book= await getBook(id);
    console.log(book)
    return book;
  };

  let myStorage = window.localStorage;
  let history = useHistory();

  const parseID = () => {
    let url = window.location.href;
    const splitted = url.split("?id=");
    return splitted[1];
  };

 

  const handleClick = () => {
    history.push(`/catalog`);
  };

  const [book, setBook] = useState({})
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("341");
  const [placeHolderName, setPlaceHolderName] = useState("Maksym-Fedir Zvarych");
  const [receiver, setReceiver] = useState("NiceGuy");
  const [expirationDate, setExpirationDate] = useState("22.2.2222");
  const [userId, setUserId] = useState('')

 useEffect(() => {
  async function fillbookData(){
  const idFromUrl=parseID();
  const result= await findBook(idFromUrl);
  setBook(result)
}
  fillbookData()
  const userIdentifier=myStorage.getPayment(`ActiveUser`);
  setUserId(userIdentifier)
 }, [])

 async function submitData(event) {
  event.preventDefault();
  const payment = await postPayment({ cardNumber,cvv,placeHolderName,receiver,expirationDate, userID:userId })
  if (payment) {
    console.log(payment)
    // const Boughtbook = await buybook(parseID(),payment.id)
    // console.log(Boughtbook)
    if(Boughtbook)
    {
      history.push(`/success?BoughtbookId=${Boughtbook.id}`);
      window.location.reload();
  }
  else{
    history.push("/home");
    window.location.reload();
  }
}


}
 
 const name = `${book.name}`;
 const text =
   "Here you can fill in your payment data to buy this book"; 
  return (
    <Wrapper>
      <InfoWrapper>
        <PaymentImage
          src={security}
          alt='Logo_image'
          width='400px'
          height='400px'
        />
        <Description>
          <DescriptionFirst>
            <SecurityplaceHolderNamecvv>{name}</SecurityplaceHolderNamecvv>
            <SecurityText>{text}</SecurityText>
          </DescriptionFirst>
          <FormWrapper>
            <h1>Please fill in your payment data:</h1>
                <form onSubmit={(e)=>submitData(e)}>
                  <label> Card Number</label>

                  <input
                    onChange={(e) => setCardNumber(e.target.value)}
                    name='bookcardNumber'
                    placeHolderName='text'
                    placeholder=' cardNumber'
                    value={cardNumber}
                  />

                  <label>Expiration Date</label>
                  <input
                    onChange={(e) => setExpirationDate(e.target.value)}
                    name='expirationDateID'
                    placeHolderName='string'
                    placeholder='expirationDate'
                  />

                  <label>Payment's receiver(must be same as book owner)</label>

                  <input
                    onChange={(e) => {
                      setReceiver(e.target.value)
                      }}
                    name='receiver'
                    placeholder='receiver'
                    placeHolderName='number'
                  />

                  <label>CVV</label>

                  <input
                    onChange={(e) => setCvv(e.target.value)}
                    name=' cvv'
                    placeHolderName='number'
                    placeholder='  cvv'
                  />

                

                  <label>PlaceHolder Name(name on your card)</label>

                  <input
                  onChange={(e) => setPlaceHolderName(e.target.value)}
                  name='placeHolderName'
                  placeHolderName='string'
                  placeholder='placeHolderName'  />

                  <button placeHolderName='submit' type='submit'>Submit</button>
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
