import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    credentials: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.STORE_ADMIN_CREDENTIALS:
            return {
                ...state,
                credentials: action.payload
            };
        case ActionTypes.CLEAR_ADMIN_CREDENTIALS:
            return {
                ...state,
                credentials: null
            };
        default:
            return state;
    }
};
