import WORD_COUNT from "../actions/actionTypes";

const INITIAL_STATE = {
  word: {
    word: "",
    count: 0
  }
};

export default (word = INITIAL_STATE, action) => {
  switch (action.type) {
    case WORD_COUNT:
      var newObj = {
        word: action.words,
        count: action.count
      };
      return { ...word, ...newObj };
    default:
      return word;
  }
};
