import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    credentials: null,
    events: {
        data: [],
        error: false,
        loading: false
    },
    submissions: {
        events: {},
        error: false,
        loading: false
    }
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
        case ActionTypes.UPDATE_EVENTS:
            return {
                ...state,
                events: {
                    ...state.events,
                    data: action.payload,
                    loading: false,
                    error: false
                }
            };
        case ActionTypes.UPDATE_EVENTS_LOADING:
            return {
                ...state,
                events: {
                    ...state.events,
                    loading: true,
                    error: false
                }
            };
        case ActionTypes.UPDATE_EVENTS_ERROR:
            return {
                ...state,
                events: {
                    ...state.events,
                    loading: false,
                    error: true
                }
            };
        case ActionTypes.UPDATE_SUBMISSIONS:
            return {
                ...state,
                submissions: {
                    ...state.submissions,
                    events: {
                        ...state.submissions.events,
                        [action.payload.eventId]: action.payload.submissions
                    },
                    loading: false,
                    error: false
                }
            };
        case ActionTypes.UPDATE_SUBMISSIONS_LOADING:
            return {
                ...state,
                submissions: {
                    ...state.submissions,
                    loading: true,
                    error: false
                }
            };
        case ActionTypes.UPDATE_SUBMISSIONS_ERROR:
            return {
                ...state,
                submissions: {
                    ...state.submissions,
                    loading: false,
                    error: true
                }
            };
        default:
            return state;
    }
};
