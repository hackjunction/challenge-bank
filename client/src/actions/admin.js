import * as ActionTypes from './ActionTypes';

export const storeCredentials = (username, password) => dispatch => {
    dispatch({
        type: ActionTypes.STORE_ADMIN_CREDENTIALS,
        payload: {
            username,
            password
        }
    });
};

export const clearCredentials = () => dispatch => {
    dispatch({
        type: ActionTypes.CLEAR_ADMIN_CREDENTIALS
    });
};
