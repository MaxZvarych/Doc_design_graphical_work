import React, {useState, useEffect} from "react";
import { CartContainer, ButtonSuccess } from "./Success.styled";
import { Result } from "antd";
import { useHistory } from "react-router-dom";
import {getAllBooks} from "../../utils/Api"

const Success = () => {
  let history = useHistory();
  const [book, setBook] = useState({})
  const [passDate, setPassDate] = useState('')
  const [expectedResult, setExptectedResult] = useState('')

  const findBook = async(id) => {
    const books= await getAllBooks();
    const book=books.find((el)=>el.id===id);
    return book;
  };

  const parseID = () => {
    let url = window.location.href;
    const splitted = url.split("?BoughtbookId=");
    console.log(splitted[1])
    return splitted[1];
  };

  useEffect(() => {
  async function fillbookData(){
    const idFromUrl=parseID();
    const result= await findBook(idFromUrl);
    setPassDate(result.certification.receiveDate)
    setExptectedResult(result.certification.result)
    setBook(result)
    
  }
    fillbookData()
   }, [])
  

  return (
    <CartContainer>
      <Result
        status="success"
        title="Your order was successfully implemented!"
        subTitle="Order Number: 34534545645645. You can check your receipt on your e-mail."
        extra={[
          <>
          <h1>Here is your book materials:
            <a href="https://www.udemy.com/">Materials</a>
          </h1>
          <h1>Don't forget to pass certification on {passDate}, demanded result is: {expectedResult}</h1>
          <ButtonSuccess onClick={() => history.push("/catalog")}>
            Go to Catalog
          </ButtonSuccess></>,
        ]}
      />
    </CartContainer>
  );
};

export default Success;
