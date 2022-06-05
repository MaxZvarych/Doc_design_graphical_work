import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Wrapper,
  InfoWrapper,
  ButtonsWrapper,
  ItemImage,
  Description,
  SecurityText,
  SecurityplaceHolderNamecvv,
  DescriptionFirst,
  ButtonscvvWrapper,
  ItemButton,
  FormWrapper
} from "./Item.styled";
import security from "../../../Icons/background2.jpg"; 
import { buyCourse, getAllBooks, postPayment } from "../../utils/Api";

const Item = () => {
  const findBook = async(id) => {
    const books= await getAllBooks();
    const book=books.find((el)=>el.id===id);
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

  const [course, setCourse] = useState({})
  const [cardNumber, setCardNumber] = useState("");
  const [id, setId] = useState("");
  const [cvv, setCvv] = useState("341");
  const [placeHolderName, setPlaceHolderName] = useState("Maksym-Fedir Zvarych");
  const [receiver, setReceiver] = useState("NiceGuy");
  const [expirationDate, setExpirationDate] = useState("22.2.2222");
  const [userId, setUserId] = useState('')

 useEffect(() => {
  async function fillCourseData(){
  const idFromUrl=parseID();
  const result= await findBook(idFromUrl);
  setCourse(result)
}
  fillCourseData()
  const userIdentifier=myStorage.getItem(`ActiveUser`);
  setUserId(userIdentifier)
 }, [])

 async function submitData(event) {
  event.preventDefault();
  const payment = await postPayment({ id,cardNumber,cvv,placeHolderName,receiver,expirationDate, userID:userId })
  if (payment) {
    console.log(payment)
    const BoughtCourse = await buyCourse(parseID(),payment.id)
    console.log(BoughtCourse)
    if(BoughtCourse)
    {
      history.push(`/success?BoughtCourseId=${BoughtCourse.id}`);
      window.location.reload();
  }
  else{
    history.push("/home");
    window.location.reload();
  }
}


}
 
 const title = `${course.title}`;
 const text =
   "Here you can fill in your payment data to buy this course"; 
  return (
    <Wrapper>
      <InfoWrapper>
        <ItemImage
          src={security}
          alt='Logo_image'
          width='400px'
          height='400px'
        />
        <Description>
          <DescriptionFirst>
            <SecurityplaceHolderNamecvv>{title}</SecurityplaceHolderNamecvv>
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

                  <label>Payment's receiver(must be same as course owner)</label>

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

                  <label>Identifier</label>

                  <input
                    onChange={(e) => setId(e.target.value)}
                    name='Id'
                    placeHolderName='number'
                    placeholder='id'
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
          <ItemButton onClick={handleClick}>Go back</ItemButton> 
        </ButtonsWrapper>
      </ButtonscvvWrapper>
    </Wrapper>
  );
};

export default Item;
