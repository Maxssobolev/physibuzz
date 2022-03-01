import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST
} from './types.js';

import api from '../apiConfig'
import { cookies } from '../pages/_app.js';

/*
----LOGIN USER
    отправляет запрос на авторизацию на сервер и закидывает токен в куки, если нажата кнопка "запомните меня"
    обновляет redux state и редеректит на главную страницу
*/
export const handleLogin = (email, password, isRemember) => async (dispatch) => {


    dispatch({
        type: LOGIN_REQUEST, //isFetching: true
    });

    return await api.post('api/v1/login', { email, password })
        .then((res) => {
            const result = res.data.data

            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    data: {
                        name: result.name
                    },
                    type: result.type,
                    token: result.token
                },
            });


            if (isRemember) {
                cookies.set('userToken', result.token, { path: '/' })
            }

            return true
        })
        .catch((error) => {
            dispatch({
                type: LOGIN_FAIL,
                payload: { message: 'Wrong username or password' },
            });

            return false
        })

}


export const handleRegistration = (fields, purpose) => async (dispatch) => {
    //общие поля
    let sendData = {
        'type': purpose,
        'name': fields.firstName,
        'last_name': fields.lastName,
        'email': fields.email,
        'confirm_email': fields.emailConfirmation,
        'password': fields.password,
        'confirm_email': fields.passwordConfirmation,
        'processing': fields.agreement
    }

    switch (purpose) {
        case 'hiring':
            sendData = {
                ...sendData,
                'company': fields.company,

            }

            break;
        case 'candidate':
            sendData = {
                ...sendData,
                'gender': fields.gender.toLowerCase(),
                'available_from': fields.availFrom,
                'profession_id': 'пока туту ничего нет'
            }
            break;
    }

    //return await api.post('api/v1/register', sendData)


}
