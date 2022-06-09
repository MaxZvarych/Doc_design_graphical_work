import React, { useState, useEffect, useRef } from "react";
import {
  Wrapper,
  Heading,
  HeadingTextButton,
  HomeButton,
  HomeImage,
  CardWrapper,
} from "./Home.styled";
import { getAllBooks, getAuthor } from "../utils/Api";
import CardItem from "../../components/CardItem/CardItem";
import heading from "../../Icons/heading1.jpg";
import { BookFilled } from "@ant-design/icons";

const Home = () => {
  const [books, setBooks] = useState([]);
  let value = useRef([]);

  const refetchAllBooks = async () => {
    getAllBooks().then((res) => {
      if (res !== undefined) {
        setBooks(res.slice(0, 3));
        value.current = res;
      }
    });
  };

  useEffect(() => {
    if (books.length === 0) {
      refetchAllBooks();
    }
  }, []);

  const showbooks = () => {
    setBooks(value.current);
    setClicked(true);
  };
  const hidebooks = () => {
    setBooks(value.current.slice(0, 3));
    setClicked(false);
  };

  const [isClicked, setClicked] = useState(false);
  return (
    <Wrapper>
      <Heading>
        <HeadingTextButton>
          <h1>General Rules:</h1>
          <p style={{ fontSize: "1rem" }}>
            <BookFilled />
            Strict silence, decorum and discipline must be maintained in the
            library. Use of cell-phones is also not allowed <br />
            <BookFilled />
            Smoking, eating, sleeping and talking loudly are strictly prohibited
            in the library <br />
            <BookFilled />
            Documents taken out of the shelves must be left on the table.
            Replacing the books on shelves is not encouraged as it may get
            misplaced. Misplaced book is like a lost book <br />
            <BookFilled />A non-member can use the library material on the
            premises with the permission of the Librarian. <br />
            <BookFilled />
            Readers should not mark, underline, dog-ear, write, tear pages or
            otherwise damage the library documents. <br />
            <BookFilled />
            Newspapers, magazines and journals must be read only in the library
            on specific tables and should not be taken to any other reading
            areas. <br />
            <BookFilled />
            No library material can be taken out of the library without
            permission. Unauthorized removal of anything belonging to the
            library will be treated as theft and dealt accordingly. <br />
            <BookFilled />
            Any one who violates the rules and regulations of the library would
            be liable to lose the privilege of library membership and may be
            debarred from using the library facilities. <br />
            <BookFilled />
            Suggestions on all aspects,of library services are welcome. <br />
          </p>
        </HeadingTextButton>
        <HomeImage
          src={heading}
          alt="Logo_image"
          width="300px"
          height="300px"
        />
      </Heading>
      <CardWrapper>
        {books.map(
          ({
            id,
            author,
            original_weekly_rent_price,
            number_of_copies,
            condition,
            name,
            genre,
            number_of_pages,
          }) => {
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
                refreshBooks={refetchAllBooks}
              />
            );
          }
        )}
      </CardWrapper>
      {!isClicked ? (
        <HomeButton onClick={showbooks}>Show more!</HomeButton>
      ) : (
        <HomeButton onClick={hidebooks}>Show less!</HomeButton>
      )}
    </Wrapper>
  );
};

export default Home;
