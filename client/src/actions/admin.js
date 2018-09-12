import * as ActionTypes from './ActionTypes';
import API from '../services/api';

export const storeCredentials = (username, password) => dispatch => {
    dispatch({
        type: ActionTypes.STORE_ADMIN_CREDENTIALS,
        payload: {
            username,
            password
        }
    });
};

export const clearCredentials = () => dispatch => {
    dispatch({
        type: ActionTypes.CLEAR_ADMIN_CREDENTIALS
    });
};

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

export const getEvents = (username, password) => {
    return async function(dispatch) {
        dispatch({
            type: ActionTypes.UPDATE_EVENTS_LOADING
        });
        return API.adminGetEvents(username, password)
            .then(events => {
                dispatch({
                    type: ActionTypes.UPDATE_EVENTS,
                    payload: events
                });
                return events;
            })
            .catch(error => {
                dispatch({
                    type: ActionTypes.UPDATE_EVENTS_ERROR
                });
                return null;
            });
    };
};

export const deleteEvent = (username, password, eventId) => {
    return async function(dispatch) {
        dispatch({
            type: ActionTypes.UPDATE_EVENTS_LOADING
        });
        return API.adminDeleteEvent(username, password, eventId)
            .then(() => {
                return dispatch(getEvents(username, password));
            })
            .catch(error => {
                dispatch({
                    type: ActionTypes.UPDATE_EVENTS_ERROR
                });
            });
    };
};
