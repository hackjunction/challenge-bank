import * as ActionTypes from './actionTypes';
import { push } from 'connected-react-router';

export const login = user => dispatch => {
    dispatch({
        type: ActionTypes.LOGIN,
        payload: user
    });
};

export const logout = () => dispatch => {
    dispatch({
        type: ActionTypes.LOGOUT,
        payload: null
    });

    dispatch(push('/'));
};
