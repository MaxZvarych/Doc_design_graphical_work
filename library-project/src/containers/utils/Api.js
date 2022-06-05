import axios from "axios";

const baseBooksURL =
  "http://127.0.0.1:8000/books/";
const baseUserURL =
  "http://127.0.0.1:8000/users/";
const basePaymentURL =
  "http://localhost:8080/api/payment";

  //BookS
export const getAllBooks = async () => {
  try {
    let responseData = await axios.get(`${baseBooksURL}`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const deleteBook = async (id) => {
  try {
    let responseData = await axios.delete(`${baseBooksURL}/delete/{id}?id=${id}`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const updateBook = async (id,body) => {
  try {
    let responseData = await axios.put(`${baseBooksURL}/update/{id}?id=${id}`,body);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const postCourse = async (body) => {
  // const json = JSON.stringify(body);
  try {
    let responseData = await axios.post(`${baseBooksURL}/create`, body);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

//USERS
export const getAllUsers = async () => {
  let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0MTgwMDA0LCJpYXQiOjE2NTQxNzgyMDQsImp0aSI6ImFkOTQ0MzI0N2NlODQ0YmE4YjkyZTFkYjM0NTZhNDNiIiwidXNlcl9pZCI6MX0.87Y2QjgCurlV7-g3iwjOTAaFzTw7uxX23cRmwHzNFtY'

  try {
    let responseData = await axios.get(`${baseUserURL}`,{ headers: {"Authorization" : `Bearer ${token}`} });
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const postUser = async ({  status, email, firstName, lastName, password}) => {
  // const json = JSON.stringify(body);
  let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0MTgwMDA0LCJpYXQiOjE2NTQxNzgyMDQsImp0aSI6ImFkOTQ0MzI0N2NlODQ0YmE4YjkyZTFkYjM0NTZhNDNiIiwidXNlcl9pZCI6MX0.87Y2QjgCurlV7-g3iwjOTAaFzTw7uxX23cRmwHzNFtY'
  
  try {
    let responseData = await axios.post(`${baseUserURL}`,{
      email: `${email}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      status: `${status}`,
      password: `${password}`
    },{ headers: {"Authorization" : `Bearer ${token}`} });
    console.log(responseData);
    return responseData.data;
  } catch(error) {
    console.log("error, cant post data", error);
  }
};

//PAYMENTS
export const getAllPayments = async () => {
  try {
    let responseData = await axios.get(`${basePaymentURL}/get-all`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const buyCourse = async (courseId,paymentId) => {
  try {
    let responseData = await axios.get(`${basePaymentURL}/buy-course/{paymentId}/{courseId}?paymentId=${paymentId}&courseId=${courseId}`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const deletePayment = async (id) => {
  try {
    let responseData = await axios.delete(`${basePaymentURL}/delete/{id}?id=${id}`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const updatePayment = async (id,body) => {
  try {
    let responseData = await axios.put(`${basePaymentURL}/update/{id}?id=${id}`,body);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const postPayment = async (body) => {
  // const json = JSON.stringify(body);
  try {
    let responseData = await axios.post(`${basePaymentURL}/create`, body);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};
