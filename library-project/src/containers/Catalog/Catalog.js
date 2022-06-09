import React, { useEffect, useState } from "react";
import { Wrapper, CardWrapper } from "./Catalog.styled";
import CardItem from "../../components/CardItem/CardItem";
import "antd/dist/antd.css";
import { getAllBooks } from "../utils/Api";
import LoadElement from "../../components/loading/LoadElement";

const Catalog = () => {
  let emptyArray = [];
  const [books, setBooks] = useState(emptyArray);

  useEffect(() => {
    console.log(books);
    if (books.length === 0) {
      getAllBooks().then((res) => {
        if (res !== undefined) {
          console.log(res);

          setBooks(res);
        }
      });
    }
  }, []);

  const refetchAllBooks = async () => {
    getAllBooks().then((res) => {
      if (res !== undefined) {
        console.log(res);
        setBooks(res);
      }
    });
  };

  return (
    <Wrapper>
      {books.length !== 0 ? (
        <>
          <CardWrapper>
            {books.map(
              (
                {
                  id,
                  author,
                  original_weekly_rent_price,
                  number_of_copies,
                  condition,
                  name,
                  genre,
                  number_of_pages,
                }
              ) => {
                return (
                  <CardItem
                  key={id}
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
                );
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
