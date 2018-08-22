import * as ActionTypes from './ActionTypes';

export const testAction = () => dispatch => {
    dispatch({
        type: ActionTypes.TEST_ACTION,
        payload: 'fooofooo'
    });
};
