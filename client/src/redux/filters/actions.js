import * as ActionTypes from './actionTypes';

export const setFilters = filters => dispatch => {
    dispatch({
        type: ActionTypes.SET_FILTERS,
        payload: filters
    });
};

export const setSelectedCategories = categories => dispatch => {
    dispatch({
        type: ActionTypes.SET_CATEGORY_FILTERS,
        payload: categories
    });
};

export const setSelectedDifficulties = difficulties => dispatch => {
    dispatch({
        type: ActionTypes.SET_DIFFICULTY_FILTERS,
        payload: difficulties
    });
};

export const clearFilters = () => dispatch => {
    dispatch({
        type: ActionTypes.CLEAR_FILTERS
    });
};
