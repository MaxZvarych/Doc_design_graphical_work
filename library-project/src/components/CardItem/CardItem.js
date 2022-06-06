import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import course from "../../Icons/course.jpg";
import {getAllUsers, deleteBook} from "../../containers/utils/Api"

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
  owner = "Masya",
  name = "Nice book",
  genre="Fantasy",
  condition='Minor damage',
  number_of_pages=420,
  id,
  refreshBooks
}) => {
  let history = useHistory();
  let myStorage = window.localStorage;

  const [userType, setUserType] = useState('user')

 useEffect(() => {
  async function getCurrentUserType(){
    const userEmail=myStorage.getItem(`ActiveUser`);
    const users= await getAllUsers();
    const user=users.find((el)=>el.email===userEmail);
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
        {`Author: ${owner}`} <br />{`Book: ${name}`} <br /> 
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
