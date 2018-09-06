import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    events: [],
    error: false,
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false,
                error: false
            };
        case ActionTypes.UPDATE_EVENTS_LOADING:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ActionTypes.UPDATE_EVENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};
