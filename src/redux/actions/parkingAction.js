export const parkingPayment = cash => {
  return {
    type: "PAYMENT",
    parkingFee: cash
  };
};

export const parkingTime = time => {
  return {
    type: "DURATION",
    parkingTime: time
  };
};
