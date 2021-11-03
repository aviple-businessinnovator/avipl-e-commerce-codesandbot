import React from "react";
import "./App.css";
import Product from "./components/product/product";
// import Headbar from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Item from './components/buy-now/Item';
import Login from './components/login/login';
import Fetchdata from "./components/api/api";
import { ShippingPage } from "./components/Shipping_progress/shippingPage/ShippingPage";
import { Navbar } from "./components/Shipping_progress/Navbar/Navbar";
import Home from "./components/home/home";
import Homepage from "./components/HomePage/App";
import ReactGA from "react-ga";

function initizeAnalytics() {
  ReactGA.initialize("UA-211874757-1")
  ReactGA.pageview('/Homepage')
}

function App() {
  initizeAnalytics()
  return (
    <>
      {localStorage.getItem('Token') ?
        <Router>
          <Switch>
            <Route path="/e-commerce" exact>
              <Navbar />
              <Product />
            </Route>
            <Route path="/main-page" exact>
              <Navbar />
              <Item />
            </Route>
            <Route path="/shipping_page" exact>
              <Navbar />
              <ShippingPage />
            </Route>
            <Route path="/sign-in" exact>
              <Login />
            </Route>
            <Route path="/home" exact>
              {/* <Home /> */}
              <Homepage />
            </Route>
            <Route path="/" exact>
              <Homepage />
            </Route>
          </Switch>
        </Router>
        :
        <Router>
          <Switch>
            <Route path="/e-commerce" exact>
              <Navbar />
              <Product />
            </Route>
            <Route path="/main-page" exact>
              <Navbar />
              <Item />
            </Route>
            <Route path="/shipping_page" exact>
              <Navbar />
              <ShippingPage />
            </Route>
            <Route path="/sign-in" exact>
              <Login />
            </Route>

            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/home" exact>
              <Homepage />
            </Route>
          </Switch>
        </Router>
      }
    </>
  );
}

export default App;
