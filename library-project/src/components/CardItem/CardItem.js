import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import course from "../../Icons/course.jpg";
import {getUser, deleteBook, getAuthor} from "../../containers/utils/Api"

import {
  DeleteOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Footer, ItemWrapper, CardStyled } from "./CardItem.styled";

const { Meta } = CardStyled;

const CardItem = ({
  imageSrc = course,
  number_of_copies = 40,
  original_weekly_rent_price = "30000$",
  owner = 1,
  name = "Nice book",
  genre="Fantasy",
  condition='Minor damage',
  number_of_pages=420,
  id,
  refreshBooks
}) => {
  let history = useHistory();
  let myStorage = window.localStorage;
  const [bookAuthor, setBookAuthor] = useState('');
  const [userType, setUserType] = useState('user')

 useEffect(() => {
  async function getCurrentUserType(){
    const userID= myStorage.getItem('ActiveUser')
    const user= await getUser(userID);
      getAuthor(owner).then((res)=>{
        setBookAuthor(`${res.name} ${res.last_name}`)
      })
      setUserType(user.is_admin?'admin':null)
    }
 
  getCurrentUserType()
 }, [])
 

  const handleClick = () => {
    history.push(`/item?id=${id}`);
  };

  const handleDelete = async (id)=>{
    const deletedCourse= await deleteBook(id);
    refreshBooks();
    return deletedCourse;
  }

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
        actions={userType==='admin'?[
          <SettingOutlined key='setting' onClick={handleClick} />,
          <DeleteOutlined onClick={()=>handleDelete(id)} key='delete' />
        ]:
        [
          <SettingOutlined key='setting' onClick={handleClick} />
        ]
      }
      >
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>
        {`Author: ${bookAuthor}`} <br />{`Book: ${name}`} <br /> 
        {`Genre: ${genre}`} <br />
        {`Pages: ${number_of_pages}`} <br />
          </p>
        <Footer>
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>
            Amount of available books:{`${number_of_copies}`} <br /> 
            Condition : {condition} <br/>
            
            Book's  weekly rent price:
            {original_weekly_rent_price}$ <br /> 
          </p>
         
        </Footer>
      </CardStyled>
    </ItemWrapper>
  );
};

export default CardItem;
