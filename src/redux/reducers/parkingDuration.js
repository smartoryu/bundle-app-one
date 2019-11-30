const INITIAL_STATE = {
  parkingDuration: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DURATION":
      return { ...state, parkingDuration: action.parkingTime };
    default:
      return state;
  }
};
