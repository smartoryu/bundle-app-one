const INITIAL_STATE = {
  parkingFee: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PAYMENT":
      return { ...state, parkingFee: action.parkingFee };
    default:
      return state;
  }
};
