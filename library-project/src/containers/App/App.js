import "./App.css";
import React, { useState } from "react";
import Header from "./Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "./Footer/Footer";
import { Provider } from "react-redux";
import store from "../utils/Redux/Store";
import SignUp from "../Authorization/SignUp/SignUp";

function App() {
  let myStorage = window.localStorage;
  return (
    <div className="App">
      <Header />
      <Provider store={store}>
        <Navigation></Navigation>
      </Provider>
      <Footer />
    </div>
  );
}

export default App;
