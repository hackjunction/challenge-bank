import * as ActionTypes from './ActionTypes';

export const setAdminPassword = password => dispatch => {
    dispatch({
        type: ActionTypes.SET_USER_PASSWORD,
        payload: password
    });
};
