import axios from "axios";
import {getStorageValue, useLocalStorage} from "./Hooks/useLocalStorageHook"

const baseBooksURL =
  "http://127.0.0.1:8000/books/";
const baseAuthorURL =
  "http://127.0.0.1:8000/authors/";
const baseUserURL =
  "http://127.0.0.1:8000/users/";
const baseTokenUrl =
  "http://127.0.0.1:8000/token/";
const baseRecordsUrl =
  "http://127.0.0.1:8000/rent_records/";

  const token= localStorage.getItem('AccessToken')


  //BookS
export const getAllBooks = async () => {
  try {
    let responseData = await axios.get(`${baseBooksURL}`,{ headers: {"Authorization" : `Bearer ${token}`} });
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const getBook = async (id) => {
  try {
    let responseData = await axios.get(`${baseBooksURL}${id}/`,{ headers: {"Authorization" : `Bearer ${token}`} });
    // console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const deleteBook = async (id) => {
  try {
    let responseData = await axios.delete(`${baseBooksURL}${id}/`,{ headers: {"Authorization" : `Bearer ${token}`} });
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

//Authors

export const getAuthor = async (id) => {
  try {
    let responseData = await axios.get(`${baseAuthorURL}${id}/`,{ headers: {"Authorization" : `Bearer ${token}`} });
    // console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};


//AUTH

export const signIn = async ({ email, password}) => {
  console.log(email,password)
  // const additionalToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1MjA2NjE0LCJpYXQiOjE2NTQ2MDE4MTQsImp0aSI6IjU3OTVkM2NhOWNkMjQ4MmQ4NzFjZDc1ZWE4N2RjY2VlIiwidXNlcl9pZCI6MX0.eeSan0V2iVgFbX-XBsIuc-eNQA9RYmuEE146poIjlo4'

  try {
    let responseData = await axios.post(`${baseTokenUrl}`,{
      email: `${email}`,
      password: `${password}`
    });
    console.log(responseData);
    return responseData.data;
  } catch(error) {
    console.log("error, cant post data", error);
  }
};

//USERS
export const getAllUsers = async () => {
  const additionalToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1MjA2NjE0LCJpYXQiOjE2NTQ2MDE4MTQsImp0aSI6IjU3OTVkM2NhOWNkMjQ4MmQ4NzFjZDc1ZWE4N2RjY2VlIiwidXNlcl9pZCI6MX0.eeSan0V2iVgFbX-XBsIuc-eNQA9RYmuEE146poIjlo4'

  try {
    let responseData = await axios.get(`${baseUserURL}`,{ headers: {"Authorization" : `Bearer ${token?token:additionalToken}`} });
    // console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const getUser = async (id) => {
 
  try {
    let responseData = await axios.get(`${baseUserURL}${id}/`,{ headers: {"Authorization" : `Bearer ${token}`} });
    // console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const postUser = async ({  status, email, firstName, lastName, password}) => {
 
  try {
    let responseData = await axios.post(`${baseUserURL}`,{
      email: `${email}`,
      first_name: `${firstName}`,
      last_name: `${lastName}`,
      status: status?`${status}`:status,
      password: `${password}`
    });
    console.log(responseData);
    return responseData.data;
  } catch(error) {
    console.log("error, cant post data", error);
  }
};

//Records 
export const getAllRecords = async () => {
  try {
    let responseData = await axios.get(`${baseRecordsUrl}`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const deleteRecord = async (id) => {
  try {
    let responseData = await axios.delete(`${baseRecordsUrl}/${id}/`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const postRecord = async (body) => {
  // const json = JSON.stringify(body);
  try {
    let responseData = await axios.post(`${baseRecordsUrl}`, body);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};
