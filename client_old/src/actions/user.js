import * as ActionTypes from './ActionTypes';
import API from '../services/api';

export const updateUser = user => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_USER,
        payload: user
    });
};

export const clearUser = () => dispatch => {
    dispatch({
        type: ActionTypes.CLEAR_USER
    });
};

export const updateUserWithToken = token => {
    return async function(dispatch) {
        return API.updateUserWithToken(token)
            .then(user => {
                dispatch({
                    type: ActionTypes.UPDATE_USER,
                    payload: user
                });
            })
            .catch(error => {});
    };
};

export const userGetSubmissions = token => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.UPDATE_USER_SUBMISSIONS_LOADING });
        return API.userGetSubmissions(token)
            .then(submissions => {
                dispatch({
                    type: ActionTypes.UPDATE_USER_SUBMISSIONS,
                    payload: submissions
                });
            })
            .catch(error => {
                dispatch({
                    type: ActionTypes.UPDATE_USER_SUBMISSIONS_ERROR
                });
            });
    };
};

export const setAvailableCategoryFilters = categories => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_CATEGORY_FILTERS_AVAILABLE,
        payload: categories
    });
};

export const setSelectedCategoryFilters = categories => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_CATEGORY_FILTERS_SELECTED,
        payload: categories
    });
};

export const setAvailableDifficultyFilters = difficulties => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_DIFFICULTY_FILTERS_AVAILABLE,
        payload: difficulties
    });
};

export const setSelectedDifficultyFilters = difficulties => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_DIFFICULTY_FILTERS_SELECTED,
        payload: difficulties
    });
};

export const setUserHideSubmitted = hideSubmitted => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_USER_HIDE_SUBMITTED,
        payload: hideSubmitted
    });
};

export const setSelectedSort = sortOption => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_USER_SORT_OPTION,
        payload: sortOption
    });
};
