import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    UPDATE_USER
} from './types.js';

import api from '../apiConfig'
import { cookies } from '../pages/_app.js';
import moment from 'moment';
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


            //if (isRemember) {
            cookies.set('userToken', result.token, { path: '/' })
            cookies.set('userName', result.name, { path: '/' })
            cookies.set('userType', result.type, { path: '/' })
            //}

            return { token: result.token, type: result.type, userName: result.name }
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
    let sentData = {
        'type': purpose,
        'name': fields.firstName,
        'last_name': fields.lastName,
        'email': fields.email,
        'confirm_email': fields.emailConfirmation,
        'password': fields.password,
        'confirm_password': fields.passwordConfirmation,
        'processing': fields.agreement
    }

    switch (purpose) {
        case 'hiring':
            sentData = {
                ...sentData,
                'company': fields.company,
                'profession_id': [fields.profession.id],

            }

            break;
        case 'candidate':
            //создаем массив айдишников профессий
            let profIds = []
            fields.professionMulti.forEach(profession => {
                profIds.push(profession.id)
            })
            sentData = {
                ...sentData,
                'gender': fields.gender.value,
                'available_from': moment(fields.availFrom).format('YYYY-MM-DD HH:MM:S'),
                'profession_id': profIds,
                "years": fields.years.value,
                "country": fields.country.data.country,
                "country_of_reg": fields.countriesOfReg.data.country,
                "country_of_reg_add": fields?.countriesOfRegAd?.data.country,
                'birthday': moment(new Date()).format('YYYY-MM-DD HH:MM:S')
            }
            break;
    }
    console.log(sentData)
    return await api.post('api/v1/register', sentData)
        .then(res => {
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

            cookies.set('userToken', result.token, { path: '/' })
            cookies.set('userType', result.type, { path: '/' })
            cookies.set('userName', result.name, { path: '/' })


            return { token: result.token, type: result.type, userName: result.name }
        })


}


export const handleUpdateUserState = (uUser) => (dispatch) => {

    dispatch({
        type: UPDATE_USER,
        payload: {
            data: uUser,
            type: uUser.type,
            token: uUser.token,
            updated: true
        },
    });

}

