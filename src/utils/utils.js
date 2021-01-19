export const numberFixedDecimal = (val, decimal) => {
    return Math.round(val * decimal) / decimal
}
export const countDecimals = (value) => {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
}
export const decimalChecker = (value, decimal) => {
    if(Math.floor(value).toString() === value || value === "" ) return true
    const re = new RegExp('^\\d+\\.\\d{0,' + decimal + '}$', "g");
    return re.test(value)
}