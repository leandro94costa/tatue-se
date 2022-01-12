/* eslint-disable import/no-anonymous-default-export */
import {
    SAVE_USER_SUCCESS,
    SAVE_USER_FAIL,
    SAVE_PICTURE_SUCCESS,
    SAVE_PICTURE_FAIL,
    FETCH_USER_INFO,
    FETCH_USER_PICTURE
} from '../actions/types';

const initialState = {
    user: {
        email: '',
        profilePicture: {
            publicId: ''
        }
    },
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SAVE_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: false,
                error: {}
            }
        case SAVE_USER_FAIL:
            return {
                ...state,
                user: {},
                error: {
                    msg: payload
                }
            }
        case SAVE_PICTURE_SUCCESS:
        case FETCH_USER_PICTURE:
            return {
                ...state,
                user: payload,
                error: {}
            }
        case SAVE_PICTURE_FAIL:
            return {
                ...state,
                error: payload
            }
        case FETCH_USER_INFO:
            return {
                ...state,
                user: payload,
                error: null
            }
        default:
            return state;
    }
}