import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar/navbar.component.jsx";
import Footer from "./components/Footer/Footer.component.jsx";

import HomePage from './pages/Home/Home.component.jsx'
import DetailPage from './pages/Details/Details.component.jsx'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/details/:id" component={DetailPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
