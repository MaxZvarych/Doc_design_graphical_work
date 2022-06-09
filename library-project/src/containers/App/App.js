import "./App.css";
import React from "react";
import Header from "./Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "./Footer/Footer";
import { Provider } from "react-redux";
import store from "../utils/Redux/Store";

function App() {
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
