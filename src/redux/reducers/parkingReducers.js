import PAY_PARKING from "../actions/actionTypes";

const INITIAL_STATE = {
  parkingState: {
    duration: 0,
    total: 0
  }
};

export default (parkingState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAY_PARKING:
      var newObj = {
        duration: action.duration,
        total: action.total
      };
      return { ...parkingState, ...newObj };
    default:
      return parkingState;
  }
};
