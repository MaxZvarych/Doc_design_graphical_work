import React, { useState } from "react";
import {
  LinkingWrapper,
  GlobalWrapper,
  SecondGlobalWrapper,
} from "./Navigation.styled";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Home from "../Home/Home";
import Cart from "../Cart/Cart";
import Catalog from "../Catalog/Catalog";
import Item from "../Catalog/Item/Item";
import Checkout from "../Ckeckout/Checkout";
import Payment from "../Payment/Payment";
import Success from "../Ckeckout/Success/Success";
import SignUp from "../Authorization/SignUp/SignUp";
import LogIn from "../Authorization/LogIn/LogIn";

const Navigation = () => {
  let history = useHistory();
  const myStorage = window.localStorage;
  let authorized = false;
  if (myStorage.getItem("isAuthorized") === "true") authorized = true;
  const toSignUp = () => {
    history.push("/signup");
  };
  return (
    <React.Fragment>
      <Router>
        {authorized ? (
          <GlobalWrapper>
            <LinkingWrapper>
              <ul>
                <li>
                  <NavLink exact to="/" activeClassName="selected">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/catalog" activeClassName="selected">
                    Catalog
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/payment" activeClassName="selected">
                    Payment
                  </NavLink>
                </li>
              </ul>
              <Switch>
                <Route path="/catalog">
                  <Catalog></Catalog>
                </Route>
                <Route path="/payment">
                  <Payment></Payment>
                </Route>
                <Route path="/item">
                  <Item></Item>
                </Route>
                <Route path="/checkout">
                  <Checkout></Checkout>
                </Route>
                <Route path="/success">
                  <Success></Success>
                </Route>
                <Route path="/">
                  <Home></Home>
                </Route>
              </Switch>
            </LinkingWrapper>
          </GlobalWrapper>
        ) : (
          <React.Fragment>
            <SecondGlobalWrapper>
              <LinkingWrapper>
                <ul>
                  <li>
                    <NavLink exact to="/signup" activeClassName="selected">
                      Sign up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/login" activeClassName="selected">
                      Log in
                    </NavLink>
                  </li>
                </ul>
              </LinkingWrapper>
            </SecondGlobalWrapper>
            <Switch>
              <Route exact path="/login">
                <LogIn></LogIn>
              </Route>
              <Route exact path="/signup">
                <SignUp></SignUp>
              </Route>
            </Switch>
          </React.Fragment>
        )}
      </Router>
    </React.Fragment>
  );
};

export default Navigation;
