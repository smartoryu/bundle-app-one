import React, { Component } from "react";
import { connect } from "react-redux";
import { wordCounter } from "../redux/actions";

class CounterWord extends Component {
  componentDidMount() {
    document.title = "Counter-word";
  }

  wordCounter = () => {
    var words = this.refs.words.value;
    var count = words.split(" ").filter(word => word.length > 0).length;
    this.props.wordCounter(words, count);
  };

  wordCounterReset = () => {
    this.props.wordCounter(0, 0);
    this.refs.words.value = "";
  };

  render() {
    return (
      <div>
        <div className="mx-auto mt-5">
          <center>
            <p className="font-weight-bold mx-auto"> Text Area</p>
            <input
              onChange={this.wordCounter}
              ref="words"
              type="text"
              style={{ width: "50%" }}
              className="mx-2"
            />
            <br />
            <button
              onClick={this.wordCounterReset}
              className="btn btn-primary mt-3"
            >
              {this.props.wordCount} word{this.props.wordCount > 1 ? "s" : ""}
            </button>
          </center>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    word: state.wordCounterApp.word,
    wordCount: state.wordCounterApp.count
  };
};

export default connect(mapStateToProps, { wordCounter })(CounterWord);
