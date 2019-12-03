import React, { Component } from "react";
import { connect } from "react-redux";
import { wordCounter } from "../redux/actions";

class CounterWord extends Component {
  // Mengganti title website
  componentDidMount() {
    document.title = "Counter-word";
  }

  // function untuk menjalankan onChange di input render()
  wordCounter = () => {
    var words = this.refs.words.value;
    var count = words.split(" ").filter(word => word.length > 0).length;
    this.props.wordCounter(words, count);
  };

  // function untuk button reset
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
              onChange={this.wordCounter} // ===> lokasi function
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
    word: state.wordCounterState.word,
    wordCount: state.wordCounterState.count
  };
};

export default connect(mapStateToProps, { wordCounter })(CounterWord);
