import React, { Component } from "react";

class Homepage extends Component {
  componentDidMount() {
    document.title = "Bundle-app";
  }

  render() {
    return <div className="homepage">Henlo ;)</div>;
  }
}

export default Homepage;
