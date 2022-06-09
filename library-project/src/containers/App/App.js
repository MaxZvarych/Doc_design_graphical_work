import "./App.css";
import React from "react";
import Header from "./Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "./Footer/Footer"; 

function App() {
  return (
    <div className="App">
      <Header /> 
        <Navigation></Navigation> 
      <Footer />
    </div>
  );
}

export default App;
