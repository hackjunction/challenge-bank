import * as ActionTypes from './ActionTypes';
import API from '../services/api';

export const getSubmissionsForEvent = (username, password, eventId) => {
    return async function(dispatch) {
        dispatch({
            type: ActionTypes.UPDATE_SUBMISSIONS_LOADING
        });
        return API.adminGetSubmissionsForEvent(username, password, eventId)
            .then(submissions => {
                dispatch({
                    type: ActionTypes.UPDATE_SUBMISSIONS,
                    payload: {
                        submissions,
                        eventId
                    }
                });
                return submissions;
            })
            .catch(error => {
                dispatch({
                    type: ActionTypes.UPDATE_SUBMISSIONS_ERROR
                });
                return null;
            });
    };
};
