import PAY_PARKING from "../actions/actionTypes";

export const paymentPark = (vehicle, time, total = 0) => {
  switch (vehicle) {
    case "motorcycle":
      return {
        type: PAY_PARKING,
        duration: time,
        total: time * 1000
      };
    case "car":
      return {
        type: PAY_PARKING,
        duration: time,
        total: time * 2000
      };
    default:
      return {
        type: PAY_PARKING,
        duration: 0,
        total: 0
      };
  }
};
