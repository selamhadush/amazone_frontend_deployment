import React from "react";
import numeral from "numeral";

const CurrencyFormat = ({ amount }) => {
  const forrmatedAmount = numeral(amount).format("$0, 0.00");
  return <div>{forrmatedAmount}</div>;
};
export default CurrencyFormat;
