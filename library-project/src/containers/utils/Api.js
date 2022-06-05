import axios from "axios";

const baseCourcesURL =
  "http://localhost:8080/api/course";
const baseUserURL =
  "http://localhost:8080/api/user";
const basePaymentURL =
  "http://localhost:8080/api/payment";

  //COURCES
export const getAllCources = async () => {
  try {
    let responseData = await axios.get(`${baseCourcesURL}/get-all`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const deleteCource = async (id) => {
  try {
    let responseData = await axios.delete(`${baseCourcesURL}/delete/{id}?id=${id}`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const updateCource = async (id,body) => {
  try {
    let responseData = await axios.put(`${baseCourcesURL}/update/{id}?id=${id}`,body);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const postCourse = async (body) => {
  // const json = JSON.stringify(body);
  try {
    let responseData = await axios.post(`${baseCourcesURL}/create`, body);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

//USERS
export const getAllUsers = async () => {
  try {
    let responseData = await axios.get(`${baseUserURL}/get-all`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const deleteUser = async (id) => {
  try {
    let responseData = await axios.delete(`${baseUserURL}/delete/{id}?id=${id}`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant delete data");
  }
};

export const updateUser = async (id,body) => {
  try {
    let responseData = await axios.put(`${baseUserURL}/update/{id}?id=${id}`,body);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant update data");
  }
};

export const postUser = async ({ id, type, phoneNumber, location, email, firstName, lastName}) => {
  // const json = JSON.stringify(body);
  try {
    let responseData = await axios.post(`${baseUserURL}/create`,{
      id: `${id}`,
      email: `${email}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      type: `${type}`,
      phoneNumber: `${phoneNumber}`,
      location: `${location}`
    });
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
