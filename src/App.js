import React from "react";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar/navbar.component.jsx";

import Homepage from "./pages/Home/Home.component.jsx";
import Mylist from "./pages/Mylist/Mylist.component.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/details" />
        <Route path="/search" />
        <Route path="/mylist" component={Mylist} />
      </Switch>
    </div>
  );
}

export default App;
