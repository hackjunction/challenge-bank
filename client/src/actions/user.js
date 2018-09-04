import * as ActionTypes from './ActionTypes';

export const updateUser = user => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_USER,
        payload: user
    });
};

export const clearUser = () => dispatch => {
    dispatch({
        type: ActionTypes.CLEAR_USER
    });
};
