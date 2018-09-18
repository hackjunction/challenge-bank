import * as ActionTypes from './ActionTypes';
import API from '../services/api';

export const getEventScores = () => {
    return async function(dispatch) {
        dispatch({
            type: ActionTypes.EVENT_SCORES_LOADING
        });
        return API.getEventScores()
            .then(scores => {
                dispatch({
                    type: ActionTypes.UPDATE_EVENT_SCORES,
                    payload: scores
                });
            })
            .catch(error => {
                dispatch({
                    type: ActionTypes.EVENT_SCORES_ERROR
                });
            });
    };
};

export const getUserScores = () => {
    return async function(dispatch) {
        dispatch({
            type: ActionTypes.USER_SCORES_LOADING
        });
        return API.getUserScores()
            .then(scores => {
                dispatch({
                    type: ActionTypes.UPDATE_USER_SCORES,
                    payload: scores
                });
            })
            .catch(error => {
                dispatch({
                    type: ActionTypes.USER_SCORES_ERROR
                });
            });
    };
};
