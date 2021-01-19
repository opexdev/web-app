export const numberFixedDecimal = (val , decimal) =>{
    return Math.round(val * decimal) / decimal
}
export const countDecimals =  ( value ) => {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
}