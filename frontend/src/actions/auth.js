import axios from "axios";

import { setAuthToken } from "../utils/authToken";
import { setAlert } from "./alert";

import {
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    RESET_PASSWORD_EMAIL_SUCCESS,
    RESET_PASSWORD_EMAIL_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_STATE
} from './types';

import { setAlertTimeout } from './alert';
import { fetchUserInfo } from "./user";

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
}

export const authenticate = login => async dispatch => {
    try {
        const { data } = await axios.post('/api/auth', login);

        if (data.token) {
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: data
            });

            setAuthToken(data.token);
            
            dispatch(fetchUserInfo());
        } else {
            dispatch({
                type: SIGNIN_FAIL,
                payload: data
            });
        }
    } catch (err) {
        dispatch({
            type: SIGNIN_FAIL
        });
        dispatch(setAlertTimeout('E-mail or password incorrect.', 'danger'));
    }
}

export const sendForgotPasswordEmail = email => async dispatch => {
    try {
        const { status, data } = await axios.post('api/auth/forgot-password', { email });

        if (status === 200) {
            dispatch({
                type: RESET_PASSWORD_EMAIL_SUCCESS,
                payload: data
            });
        } else {
            throw new Error();
        }
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_EMAIL_FAIL
        });
        dispatch(setAlert('E-mail could not be sent. Please review your e-mail address and try again.', 'danger'));
    }
}

export const resetPassword = (id, token, password) => async dispatch => {
    try {
        const { data } = await axios.post(`api/auth/reset-password/${id}/${token}`, { password });

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
        dispatch(setAlert('Link expired or invalid, please request a new one.', 'danger'));
    }
}

export const resetAuthState = () => async dispatch => {
    dispatch({
        type: RESET_STATE
    });
}