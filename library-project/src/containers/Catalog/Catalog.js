import React, { useEffect, useState } from "react";
import {
  Wrapper,
  CardWrapper,
  AddCourceWrapper,
  FormWrapper,
} from "./Catalog.styled";
import CardItem from "../../components/CardItem/CardItem";
import "antd/dist/antd.css";
import {  getAllBooks,getAuthor } from "../utils/Api";
import LoadElement from "../../components/loading/LoadElement";

const Catalog = () => {
  let emptyArray = [];
  const [cources, setCources] = useState(emptyArray);
  const [addCourceState, setAddCourceState] = useState('');
  const [owner, setOwner] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("0$");
  const [title, setTitle] = useState("Nice course");
  const [isActive, setIsActive] = useState(false);
  const [certification, setCertification] = useState({receiveDate:"22.2.2222", result:"excellent"});
  
  useEffect(() => {
    console.log(cources)
    if (cources.length === 0) {
      getAllBooks().then((res) => {
        if (res !== undefined) {
          console.log(res)

          setCources(res);
        }
      });
    }
  },[]);

  const refetchAllBooks = async () => {
    getAllBooks().then((res) => {
      if (res !== undefined) {
        console.log(res)
        setCources(res);
      }
    });
  };


  return (
    <Wrapper>
      {cources.length !== 0 ? (
        <>
          <CardWrapper>
            {cources.map(
               ({ id,author,original_weekly_rent_price,number_of_copies,condition,name,genre,number_of_pages }, index) => {
              
                return (
                    <CardItem
                    owner={author}
                    original_weekly_rent_price={original_weekly_rent_price}
                    number_of_copies={number_of_copies}
                      id={id}
                      name={name}
                      genre={genre}
                      number_of_pages={number_of_pages}
                      condition={condition}
                      refreshCourses={refetchAllBooks}
                    />
                ) 
              }
            )}
          </CardWrapper>
        </>
      ) : (
        <LoadElement></LoadElement>
      )}
    </Wrapper>
  );
};

export default Catalog;
