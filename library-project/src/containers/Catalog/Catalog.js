import React, { useEffect, useState } from "react";
import {
  Wrapper,
  CardWrapper,
  AddCourceWrapper,
  FormWrapper,
} from "./Catalog.styled";
import CardItem from "../../components/CardItem/CardItem";
import "antd/dist/antd.css";
import {  getAllBooks, postCourse } from "../utils/Api";
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

  async function submitData() {
    setAddCourceState("");
    postCourse({ title, price, isActive, certification, owner,id }).then((response) =>
      refetchAllBooks()
    );
  }

  return (
    <Wrapper>
      {cources.length !== 0 ? (
        <>
          <CardWrapper>
            {cources.map(
              ({ title, price, isActive, certification, owner, id }, index) => {
                return index === 0 ||
                  index === 1 ||
                  index === 2 ||
                  index === 3 ? (
                    <CardItem
                    owner={owner}
                    price={price}
                    isActive={isActive}
                      id={id}
                      title={title}
                      certification={certification}
                      refreshCourses={refetchAllBooks}
                    />
                ) : (
                  <CardItem
                    title={title}
                    price={price}
                    isActive={isActive}
                    id={id}
                    certification={certification}
                    owner={owner}
                  />
                );
              }
            )}
          </CardWrapper>
          <AddCourceWrapper>
            {
            addCourceState === "" ? (
              <button
                onClick={() => {
                  setAddCourceState("Adding a Cource");
                }}
              >
                Add new Course
              </button>
            ) : (
              <FormWrapper>
                <form onSubmit={submitData}>
                  <label>Cource owner</label>

                  <input
                    onChange={(e) => setOwner(e.target.value)}
                    name='Courceowner'
                    title='text'
                    placeholder='Cource owner'
                    value={owner}
                  />

                  <label>Cource certification(indentifier, exam pass date and demanded result)</label>
                  <input
                    onChange={(e) => setCertification({...certification,id:e.target.value})}
                    name='CertificationID'
                    title='string'
                    placeholder='Certification identifier'
                  />
                  <input
                    onChange={(e) => setCertification({...certification,receiveDate:e.target.value})}
                    name='CertificationReceiveDate'
                    title='string'
                    placeholder='Certification pass Date'
                  />
                 
                    <select onChange={(e) => {console.log(e.target.value);setCertification({...certification,result:e.target.value})}} name='title'>
                    <option value='excelent'>excelent</option>
                    <option value='good'>good</option>
                    <option value='satisfying'>satisfying</option>
                    <option value='could be better'>could be better</option>
                    <option value='polino'>polino</option>
                  </select>
                

                  <label>Cource isActive</label>

                  <input
                    onChange={(e) => {
                      setIsActive(e.target.checked)
                      }}
                    name='CourceisActive'
                    type="checkbox"
                    title='number'
                  />

                  <label>Cource price</label>

                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    name='Courceprice'
                    title='number'
                    placeholder='Cource price'
                  />

                  <label>Cource's id</label>

                  <input
                    onChange={(e) => setId(e.target.value)}
                    name='courceId'
                    title='number'
                    placeholder='Cource id'
                  />

                  <label>title</label>

                  <input
                  onChange={(e) => setTitle(e.target.value)}
                  name='CourceTitle'
                  title='string'
                  placeholder='Cource title'  />

                  <button title='submit'>Submit</button>
                </form>
              </FormWrapper>
            )
          }
          </AddCourceWrapper>
        </>
      ) : (
        <LoadElement></LoadElement>
      )}
    </Wrapper>
  );
};

export default Catalog;
