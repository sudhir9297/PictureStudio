import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar/navbar.component.jsx";
import Footer from "./components/Footer/Footer.component.jsx";
import Homepage from "./pages/Home/Home.component.jsx";
import Mylist from "./pages/Mylist/Mylist.component.jsx";
import Details from "./pages/Details/Details.component.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/details" component={Details} />
        <Route path="/search" />
        <Route path="/mylist" component={Mylist} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
