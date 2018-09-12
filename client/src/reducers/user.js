import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    user: null,
    submissions: {
        data: [],
        loading: false,
        error: false
    },
    categoryFilters: {
        selected: [],
        available: []
    },
    difficultyFilters: {
        selected: [],
        available: []
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
            return initialState;
        case ActionTypes.UPDATE_USER_SUBMISSIONS:
            return {
                ...state,
                submissions: {
                    ...state.submissions,
                    data: action.payload,
                    loading: false,
                    error: false
                }
            };
        case ActionTypes.UPDATE_USER_SUBMISSIONS_LOADING:
            return {
                ...state,
                submissions: {
                    ...state.submissions,
                    loading: true,
                    error: false
                }
            };
        case ActionTypes.UPDATE_USER_SUBMISSIONS_ERROR:
            return {
                ...state,
                submissions: {
                    ...state.submissions,
                    loading: false,
                    error: true
                }
            };
        case ActionTypes.UPDATE_DIFFICULTY_FILTERS_AVAILABLE:
            return {
                ...state,
                difficultyFilters: {
                    ...state.difficultyFilters,
                    available: action.payload
                }
            };
        case ActionTypes.UPDATE_DIFFICULTY_FILTERS_SELECTED:
            return {
                ...state,
                difficultyFilters: {
                    ...state.difficultyFilters,
                    selected: action.payload
                }
            };
        case ActionTypes.UPDATE_CATEGORY_FILTERS_AVAILABLE:
            return {
                ...state,
                categoryFilters: {
                    ...state.categoryFilters,
                    available: action.payload
                }
            };
        case ActionTypes.UPDATE_CATEGORY_FILTERS_SELECTED:
            return {
                ...state,
                categoryFilters: {
                    ...state.categoryFilters,
                    selected: action.payload
                }
            };
        default:
            return state;
    }
};
