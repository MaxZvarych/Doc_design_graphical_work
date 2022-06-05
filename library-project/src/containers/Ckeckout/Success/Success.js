import React, {useState, useEffect} from "react";
import { CartContainer, ButtonSuccess } from "./Success.styled";
import { Result } from "antd";
import { useHistory } from "react-router-dom";
import {getAllCources} from "../../utils/Api"

const Success = () => {
  let history = useHistory();
  const [course, setCourse] = useState({})
  const [passDate, setPassDate] = useState('')
  const [expectedResult, setExptectedResult] = useState('')

  const findCourse = async(id) => {
    const cources= await getAllCources();
    const cource=cources.find((el)=>el.id===id);
    return cource;
  };

  const parseID = () => {
    let url = window.location.href;
    const splitted = url.split("?BoughtCourseId=");
    console.log(splitted[1])
    return splitted[1];
  };

  useEffect(() => {
  async function fillCourseData(){
    const idFromUrl=parseID();
    const result= await findCourse(idFromUrl);
    setPassDate(result.certification.receiveDate)
    setExptectedResult(result.certification.result)
    setCourse(result)
    
  }
    fillCourseData()
   }, [])
  

  return (
    <CartContainer>
      <Result
        status="success"
        title="Your order was successfully implemented!"
        subTitle="Order Number: 34534545645645. You can check your receipt on your e-mail."
        extra={[
          <>
          <h1>Here is your course materials:
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
