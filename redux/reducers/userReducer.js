import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from '../types'

const initialState = {
    data: {},
    isFetching: false,
    type: '',
    token: null,
    error: ''
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
        default:
            return state
    }
}




