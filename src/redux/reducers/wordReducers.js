import WORD_COUNT from "../actions/actionTypes";

const INITIAL_STATE = {
  wordCounterState: {
    word: "",
    count: 0
  }
};

export default (wordCounterState = INITIAL_STATE, action) => {
  switch (action.type) {
    case WORD_COUNT:
      var newObj = {
        word: action.words,
        count: action.count
      };
      return { ...wordCounterState, ...newObj };
    default:
      return wordCounterState;
  }
};
