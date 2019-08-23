import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    events: {
        data: [],
        loading: false,
        error: false
    },
    users: {
        data: [],
        loading: false,
        error: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.EVENT_SCORES_LOADING: {
            return {
                ...state,
                events: {
                    ...state.events,
                    loading: true,
                    error: false
                }
            };
        }
        case ActionTypes.EVENT_SCORES_ERROR: {
            return {
                ...state,
                events: {
                    ...state.events,
                    loading: false,
                    error: true
                }
            };
        }
        case ActionTypes.UPDATE_EVENT_SCORES: {
            return {
                ...state,
                events: {
                    ...state.events,
                    data: action.payload,
                    loading: false,
                    error: false
                }
            };
        }
        case ActionTypes.USER_SCORES_LOADING: {
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: true,
                    error: false
                }
            };
        }
        case ActionTypes.USER_SCORES_ERROR: {
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    error: true
                }
            };
        }
        case ActionTypes.UPDATE_USER_SCORES: {
            return {
                ...state,
                users: {
                    ...state.users,
                    data: action.payload,
                    loading: false,
                    error: false
                }
            };
        }
        default:
            return state;
    }
};
