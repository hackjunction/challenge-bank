import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };
        case ActionTypes.CLEAR_USER:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};
