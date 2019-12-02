import WORD_COUNT from "../actions/actionTypes";

export const wordCounter = (words, count) => {
  if ((words, count)) {
    return { type: WORD_COUNT, words, count };
  } else {
    return { type: WORD_COUNT, words: 0, count: 0 };
  }
};
