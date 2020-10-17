import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGINOUT,
    CLEAR_ERRORS
} from '../Types';

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            // console.log(action.payload)
            // localStorage.removeItem('userID');
            localStorage.setItem('userID', action.payload);
            // localStorage.setItem('isAuthenticated', true);
            return {
                ...state,
                userID: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGINOUT:
            localStorage.removeItem('userID');
            // localStorage.setItem('isAuthenticated', false);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};