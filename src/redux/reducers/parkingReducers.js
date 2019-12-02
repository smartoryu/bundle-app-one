import PAY_PARKING from "../actions/actionTypes";

const INITIAL_STATE = {
  parking: {
    duration: 0,
    total: 0
  }
};

export default (parking = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAY_PARKING:
      var newObj = {
        duration: action.duration,
        total: action.total
      };
      return { ...parking, ...newObj };
    default:
      return parking;
  }
};
