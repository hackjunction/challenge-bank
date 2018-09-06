import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    submissions: {},
    error: false,
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_SUBMISSIONS:
            return {
                ...state,
                submissions: {
                    ...state.submissions,
                    [action.payload.eventId]: action.payload.submissions
                },
                loading: false,
                error: false
            };
        case ActionTypes.UPDATE_SUBMISSIONS_LOADING:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ActionTypes.UPDATE_SUBMISSIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};
