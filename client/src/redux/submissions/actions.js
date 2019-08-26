import * as ActionTypes from './actionTypes';
import * as AuthSelectors from '../auth/selectors';

import SubmissionsService from 'services/submissions';

export const updateSubmissions = () => async (dispatch, getState) => {
    const token = AuthSelectors.token(getState());

    const result = await dispatch({
        type: ActionTypes.UPDATE_SUBMISSIONS,
        promise: SubmissionsService.getSubmissions(token),
        meta: {
            onFailure: e => console.log('Error getting submissions', e)
        }
    });

    return;
};

export const createSubmission = (challengeId, answer) => async (dispatch, getState) => {
    const token = AuthSelectors.token(getState());

    try {
        const submission = await SubmissionsService.createSubmission(token, challengeId, answer);
        dispatch({
            type: ActionTypes.CREATE_SUBMISSION,
            payload: submission
        });
        return Promise.resolve(submission);
    } catch (err) {
        if (err.hasOwnProperty('response')) {
            return Promise.reject(err.response.data.message);
        }
        return Promise.reject('Something went wrong');
    }
};
