import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    user: null,
    userSubmissions: {
        data: [],
        loading: false,
        error: false
    }
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
                user: null,
                userSubmissions: []
            };
        case ActionTypes.UPDATE_USER_SUBMISSIONS:
            return {
                ...state,
                userSubmissions: {
                    ...state.userSubmissions,
                    data: action.payload,
                    loading: false,
                    error: false
                }
            };
        case ActionTypes.UPDATE_USER_SUBMISSIONS_LOADING:
            return {
                ...state,
                userSubmissions: {
                    ...state.userSubmissions,
                    loading: true,
                    error: false
                }
            };
        case ActionTypes.UPDATE_USER_SUBMISSIONS_ERROR:
            return {
                ...state,
                userSubmissions: {
                    ...state.userSubmissions,
                    loading: false,
                    error: true
                }
            };
        default:
            return state;
    }
};
