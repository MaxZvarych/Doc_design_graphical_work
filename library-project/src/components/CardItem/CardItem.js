/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import course from "../../Icons/course.jpg";
import {   Tooltip, Modal } from 'antd';
import { EyeOutlined  } from '@ant-design/icons';
import {
  getUser,
  deleteBook,
  getAuthor,
  getBook,
  deleteRecord,
} from "../../containers/utils/Api";

import {
  DeleteOutlined, 
  SettingOutlined,
} from "@ant-design/icons";
import { Footer, ItemWrapper, CardStyled } from "./CardItem.styled";
 

const CardItem = ({
  imageSrc = course,
  number_of_copies = 40,
  original_weekly_rent_price = "30000$",
  owner = 1,
  name = "Nice book",
  genre = "Fantasy",
  condition = "Minor damage",
  number_of_pages = 420,
  id,
  reportBook = false,
  refreshBooks,
}) => {
  let history = useHistory();
  let myStorage = window.localStorage;
  const [bookAuthor, setBookAuthor] = useState("");
  const [userType, setUserType] = useState("user");
  const [book, setBook] = useState({});
  const [previewCloseRecordData, setPreviewCloseRecordData] = useState(false);

  async function fillBalanceForUser() {
    let userIdentifier = myStorage.getItem(`ActiveUser`);
    if (userIdentifier) {
      const user = await getUser(userIdentifier);
      console.log(user.balance)
      reportBook.setBalance(user.balance);
    }
  }

  useEffect(() => {
    async function getCurrentUserType() {
      const userID = myStorage.getItem("ActiveUser");
      const user = await getUser(userID);
      setUserType(user.is_admin ? "admin" : null);
      if (reportBook) {
        const orderBook = await getBook(reportBook.bookId);
        setBook(orderBook);
        getAuthor(orderBook.author).then((res) => {
          setBookAuthor(`${res.name} ${res.last_name}`);
        });
      } else {
        getAuthor(owner).then((res) => {
          setBookAuthor(`${res.name} ${res.last_name}`);
        });
      }
    }

    getCurrentUserType();
  }, []);

  const handleClick = () => {
    history.push(`/item?id=${id}`);
  };

  const handleDelete = async (id) => {
    const deletedBook = await deleteBook(id);
    refreshBooks();
    return deletedBook;
  };

  const handlePreviewDelete = async (id) => {
    const preview = await deleteRecord(id,true);
    setPreviewCloseRecordData(preview)
    return preview;
  };

  const goToPaymentPage = ()=>{
    alert(
      "You don't have eough money on your balance, redirecting to payment page..."
    );
    setTimeout(() => {
      history.push("/payment");
      window.location.reload();
    }, 3000);
  }

  const handleDeleteReport = async (id) => {
    const deletedReport = await deleteRecord(id,false);
    deletedReport==="Not enough money on balance"?goToPaymentPage():refreshBooks();
    await fillBalanceForUser();
    return deletedReport;
  };

  const today = new Date(Date.now());

  const bookIsExpired = () => {
    const startDate = new Date(reportBook.dateCreated);
    const expirationDate = new Date(
      startDate.setDate(
        startDate.getDate() + Number(reportBook.weeksNumber * 7)
      )
    );

    return today.getTime() > expirationDate.getTime() ? true : false;
  };

  const catalogActions =
    userType === "admin"
      ? [
          <SettingOutlined key="setting" onClick={handleClick} />,
          <DeleteOutlined onClick={() => handleDelete(id)} key="delete" />,
        ]
      : [<SettingOutlined key="setting" onClick={handleClick} />];

  const reportActions = bookIsExpired()?[  
    <Tooltip title="Close this order">
    <DeleteOutlined
      onClick={() => handleDeleteReport(reportBook.recordId)}
      key="delete"
    /> 
    </Tooltip>,
    
    
      <Tooltip title="Preview order closure details(fine for overdue)">
    
      <EyeOutlined
      onClick={() => handlePreviewDelete(reportBook.recordId)}
      key="delete"
    /> 
    </Tooltip>
  
  ]:
  [  
    <Tooltip title="Close this order">
    <DeleteOutlined
      onClick={() => handleDeleteReport(reportBook.recordId)}
      key="delete"
    /> 
    </Tooltip>,
  
  
  ]
  ;

  const closePreview = () => {
    setPreviewCloseRecordData(false);
  };

  const payFine = () => {
    handleDeleteReport(reportBook.recordId)
    setPreviewCloseRecordData(false);
  };

  return (
    <ItemWrapper>
      <CardStyled
        hoverable
        style={{ width: "300px", borderRadius: "20px" }}
        cover={
          <img
            src={imageSrc}
            style={{
              width: "300px",
              borderRadius: "20px 20px 0 0",
            }}
          />
        }
        actions={reportBook ? reportActions : catalogActions}
      >
        {reportBook ? (
          <>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              {`Author: ${bookAuthor}`} <br />
              {`Book: ${book.name}`}  <br />
            </p>
            <Footer>
              <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                Rent price:{`${reportBook.rentPrice}`} <br />
                Collateral price: {reportBook.collateralPrice} <br />
                <Modal title="Preview fine" visible={previewCloseRecordData} onOk={payFine} onCancel={closePreview} >
                <h1>It's required to pay this fine: {previewCloseRecordData.detail}$</h1>
     
                </Modal>
                {bookIsExpired() ? (
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Expired
                  </p>
                ) : (
                  <p
                    style={{
                      color: "Green",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Not expired
                  </p>
                )}
              </p>
            </Footer>
          </>
        ) : (
          <>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              {`Author: ${bookAuthor}`} <br />
              {`Book: ${name}`} <br />
              {`Genre: ${genre}`} <br />
              {`Pages: ${number_of_pages}`} <br />
            </p>
            <Footer>
              <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                Amount of available books:{`${number_of_copies}`} <br />
                Condition: {condition} <br />
                `Book's weekly rent price`:
                {original_weekly_rent_price}$ <br />
              </p>
            </Footer>
          </>
        )}
      </CardStyled>
    </ItemWrapper>
  );
};

export default CardItem;
