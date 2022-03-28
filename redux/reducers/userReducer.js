import { LOGIN_FAIL, LOGOUT, LOGIN_REQUEST, LOGIN_SUCCESS, UPDATE_USER } from '../types'

const initialState = {
    data: {},
    isFetching: false,
    type: '',
    token: null,
    error: '',
    updated: false,
    logout: false
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isFetching: true, error: '' };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload.data,
                type: action.payload.type,
                token: action.payload.token
            };

        case LOGIN_FAIL:
            return {
                ...state,
                isFetching: false,
                error: action.payload.message,
            };
        case UPDATE_USER:
            return {
                ...state,
                data: action.payload.data,
                type: action.payload.type,
                token: action.payload.token,
                updated: true
            }
        case LOGOUT:
            return {
                data: {},
                isFetching: false,
                type: '',
                token: null,
                error: '',
                updated: false,
                logout: true
            }
        default:
            return state
    }
}




