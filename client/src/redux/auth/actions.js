import * as ActionTypes from './actionTypes';
import { push } from 'connected-react-router';

export const login = user => dispatch => {
    console.log('USER', user);
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
