import BigNumber from "bignumber.js";

export const numberFixedDecimal = (val, decimal) => {
  return Math.round(val * decimal) / decimal;
};
export const countDecimals = (value) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};
export const decimalChecker = (value, decimal) => {
  if (Math.floor(value).toString() === value || value === "") return true;
  const re = new RegExp("^\\d+\\.\\d{0," + decimal + "}$", "g");
  return re.test(value);
};

export const parsePriceString = (value) => {
  return parseFloat(value.replace(/[^0-9.-]+/g, ""));
};

export const validateEmail = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const encodeQueryData = (params) => {
  const ret = [];
  for (let d in params)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));
  return ret.join('&');
}

export const BN = BigNumber.clone({ FORMAT: {
    groupSize: 3,
    groupSeparator: ',',
    decimalSeparator: '.',
  }})
