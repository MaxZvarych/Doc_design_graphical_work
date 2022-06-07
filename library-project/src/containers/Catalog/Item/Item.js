import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Wrapper,
  InfoWrapper,
  ButtonsWrapper,
  ItemImage,
  Description,
  SecurityText,
  BookName,
  DescriptionFirst,
  ButtonsweeksNumberWrapper,
  ItemButton,
  FormWrapper
} from "./Item.styled";
import security from "../../../Icons/background2.jpg"; 
import {  getBook, postRecord } from "../../utils/Api";

const Item = () => {
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
  const [recordInfo, setRecordInfo] = useState(false)
  const [weeksNumber, setWeeksNumber] = useState(4);
  const [dateCreated, setDateCreated] = useState(Date.now());
  const [preview, setPreview] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [userId, setUserId] = useState('')

 useEffect(() => {
  async function fillbookData(){
  const idFromUrl=parseID();
  const result= await findBook(idFromUrl);
  setBook(result)
}
  fillbookData()
  const userIdentifier=myStorage.getItem(`ActiveUser`);
  setUserId(userIdentifier)
 }, [])

 async function submitData(event) {
  event.preventDefault();
  const record = await postRecord({ book:book.id,weeks_number:weeksNumber,date_created:dateCreated,opened:!preview })
  console.log(record, typeof(record), record && typeof(record)!='string')
  if (record && typeof(record)!=="string") {
    setRecordInfo(record)
    if(record.opened){
      history.push(`/success`);
      window.location.reload();
    }
    else{
      setPreviewData({rentPrice:record.rent_price, collateral_price:record.collateral_price})
    }
  }
  else{
    alert("You don't have eough money on your balance, redirecting to payment page...")
    setTimeout(() => { 
      history.push("/payment");
      window.location.reload();
    }, 3000);
   
  }
}
 
 const name = `${book.name}`;
 const text =
   "Here you can create an order for renting this book"; 
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
            <BookName>{name} <br/> Collateral price: {book.original_collateral_price} <br/> Price for week rent: {book.original_weekly_rent_price}</BookName>
            <SecurityText>{text}</SecurityText>
          </DescriptionFirst>
          <FormWrapper>
            <h1>Please fill in your order data:</h1>
                <form onSubmit={(e)=>submitData(e)}>

                  <label>When do you want to take a book?</label>
                  <input
                    onChange={(e) => setDateCreated(e.target.value)}
                    name='dateCreated'
                    placeHolderName='string'
                    placeholder='dateCreated'
                  />

                 

                  <label>weeksNumber</label>

                  <input
                    onChange={(e) => setWeeksNumber(Number(e.target.value))}
                    name='weeksNumber'
                    placeHolderName='number'
                    placeholder='  weeksNumber'
                    type='number'
                  />

                  <label>Do you want to preview renting conditions?</label>

                  <input
                    onChange={(e) => setPreview(Number(e.target.checked))}
                    name='weeksNumber'
                    placeHolderName='number'
                    placeholder='  weeksNumber'
                    type="checkbox"
                  />

                  <button placeHolderName='submit' type='submit'>Submit</button>
                </form>
              </FormWrapper>
        </Description>
        {preview && recordInfo?
        (
        <Description style={{justifyContent: "flex-start", border:"4px rgb(227,119,0) double", height:"15vh"}}> 
        <BookName> Preview order information(including discounts):</BookName> 
        <SecurityText>Rent price for {weeksNumber} weeks for this book: {previewData.rentPrice}</SecurityText>
        <SecurityText>Collateral price for this book: {previewData.collateral_price}</SecurityText>
        </Description>
        ):<></>
        }
      </InfoWrapper>
      <ButtonsweeksNumberWrapper> 
        <ButtonsWrapper>
          <ItemButton onClick={handleClick}>Go back</ItemButton> 
        </ButtonsWrapper>
      </ButtonsweeksNumberWrapper>
    </Wrapper>
  );
};

export default Item;
