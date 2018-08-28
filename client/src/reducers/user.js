import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    adminPassword: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER_PASSWORD:
            return {
                ...state,
                adminPassword: action.payload
            };
        default:
            return state;
    }
};
