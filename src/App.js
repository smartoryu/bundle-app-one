import React from "react";
import "./App.css";
import Header from "./components/Header";
import Parking from "./pages/Parking";
import CounterWord from "./pages/CounterWord";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Route exact path="/" component={Homepage} />
        <Route path="/parking-app" component={Parking} />
        <Route path="/counter-word" component={CounterWord} />
      </Router>
    </div>
  );
}

export default App;
