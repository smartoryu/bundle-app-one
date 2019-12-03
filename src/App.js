import React from "react";
import "./App.css";
import Header from "./components/Header";
import Parking from "./pages/Parking";
import CounterWord from "./pages/CounterWord";
import { Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path={"/"} exact component={Homepage} />
        <Route path={"/parking-app"} exact component={Parking} />
        <Route path={"/counter-word"} exact component={CounterWord} />
      </Switch>
    </div>
  );
}

export default App;
