import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_ARIST_PROFILE,
    ARTIST_PROFILE_ERROR
} from './types';

export const getCurrentProfile = artistId => async dispatch => {
    try {
        const res = await axios.get(`/api/artists/${artistId}`);

        dispatch({
            type: GET_ARIST_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: ARTIST_PROFILE_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        })
    }
}

// create or update profile
export const saveProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/artists', formData, config);

        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

        if (!edit) {
            history.push('/');
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
            type: ARTIST_PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}