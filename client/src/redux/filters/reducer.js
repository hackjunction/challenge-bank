import * as ActionTypes from './actionTypes';

const initialState = {
    filters: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_FILTERS: {
            return {
                ...state,
                filters: action.payload
            };
        }
        case ActionTypes.SET_CATEGORY_FILTERS: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    categories: action.payload
                }
            };
        }
        case ActionTypes.SET_DIFFICULTY_FILTERS: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    difficulties: action.payload
                }
            };
        }
        case ActionTypes.CLEAR_FILTERS: {
            return {
                ...state,
                filters: {}
            };
        }
        default:
            return state;
    }
}
