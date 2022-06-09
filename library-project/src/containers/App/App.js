import "./App.css";
import React , {useState, useEffect} from "react";
import Header from "./Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "./Footer/Footer"; 
import { getUser } from "../utils/Api";

function App() {
  let myStorage = window.localStorage;

  const [balance, setBalance] = useState(300);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function fillUserData() {
      let userIdentifier = myStorage.getItem(`ActiveUser`);
      if (userIdentifier) {
        const user = await getUser(userIdentifier);
        setBalance(user.balance);
        setUserId(userIdentifier);
      }
    }
    fillUserData();
  }, []);

  return (
    <div className="App">
      <Header balance={balance} userId={userId} /> 
        <Navigation setBalance={setBalance}></Navigation> 
      <Footer />
    </div>
  );
}

export default App;
