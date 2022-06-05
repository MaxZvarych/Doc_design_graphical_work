import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import course from "../../Icons/course.jpg";
import {getAllUsers, deleteCource} from "../../containers/utils/Api"

import {
  DeleteOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Footer, ItemWrapper, CardStyled } from "./CardItem.styled";

const { Meta } = CardStyled;

const CardItem = ({
  imageSrc = course,
  isActive = true,
  price = "30000$",
  owner = "Masya",
  title = "Nice Course",
  certification,
  id,
  refreshCourses
}) => {
  let history = useHistory();
  let myStorage = window.localStorage;

  const [userType, setUserType] = useState('user')

 useEffect(() => {
  async function getCurrentUserType(){
    const userID=myStorage.getItem(`ActiveUser`);
    const users= await getAllUsers();
    const user=users.find((el)=>el.id===userID);
  setUserType(user.type)
}
  getCurrentUserType()
 }, [])
 

  const handleClick = () => {
    history.push(`/item?id=${id}`);
  };

  const handleDelete = async (id)=>{
    const deletedCourse= await deleteCource(id);
    refreshCourses();
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
        <Meta title={`Owner: ${owner}`} description={`Title: ${title}`} />
        <Footer>
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>
            Cource is active:{`${isActive?'Yes':'No'}`} <br /> Cource's price:
            {price} <br /> 
          </p>
          {certification ? (
            <>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              This cource considers passing certification
            </p>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
            Certification's exam date:{`${certification.receiveDate}`} <br /> Demanded result to pass:
            {certification.result} <br /> 
          </p>
          </>
          ) : (
            <></>
          )}
        </Footer>
      </CardStyled>
    </ItemWrapper>
  );
};

export default CardItem;
