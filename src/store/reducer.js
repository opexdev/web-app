import * as actionTypes from './action';

const  initialState = {
    isDark : false,
    isLogin: false
}

const reducer = ( state = initialState , action ) => {
    switch (action.type) {
        case actionTypes.CHANGE_THEME :
            return {
                ...state,
                isDark: !state.isDark
            }
        default:
            return state;
    }
};

export default reducer;