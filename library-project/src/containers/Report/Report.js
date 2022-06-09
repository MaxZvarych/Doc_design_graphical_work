/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Wrapper, CardWrapper } from "./Report.styled";
import CardItem from "../../components/CardItem/CardItem";
import "antd/dist/antd.css";
import { getAllRecords } from "../utils/Api";
import LoadElement from "../../components/loading/LoadElement";

const Report = () => {
  let emptyArray = [];
  const myStorage = window.localStorage;
  const [books, setBooks] = useState(emptyArray);
  const [records, setRecords] = useState(emptyArray);

  useEffect(() => {
    const userId = myStorage.getItem("ActiveUser");
    if (books.length === 0) {
      getAllRecords(userId).then((res) => {
        if (res !== undefined) {
          setRecords(res);
        }
      });
    }
  }, []);

  const refetchAllRecords = async () => {
    const userId = myStorage.getItem("ActiveUser");
    getAllRecords(userId).then((res) => {
      if (res !== undefined) {
        setRecords(res);
      }
    });
  };

  return (
    <Wrapper>
      {records.length !== 0 ? (
        <>
          <CardWrapper>
            {records.map(
              (
                {
                  id,
                  collateral_price,
                  rent_price,
                  date_created,
                  weeks_number,
                  book,
                },
              ) => {
                return (
                  <CardItem key={id}
                    reportBook={{
                      recordId: id,
                      collateralPrice: collateral_price,
                      rentPrice: rent_price,
                      dateCreated: date_created,
                      weeksNumber: weeks_number,
                      bookId: book,
                    }}
                    refreshBooks={refetchAllRecords}
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

export default Report;
