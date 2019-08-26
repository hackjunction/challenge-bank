import * as ActionTypes from './actionTypes';
import { handle } from 'redux-pack';
import { concat } from 'lodash-es';

const initialState = {
    data: [],
    loading: false,
    error: false,
    updated: 0
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_SUBMISSIONS: {
            return handle(state, action, {
                start: prevState => ({
                    ...prevState,
                    loading: true,
                    error: false
                }),
                finish: prevState => ({
                    ...prevState,
                    loading: false
                }),
                failure: prevState => ({
                    ...prevState,
                    error: true
                }),
                success: prevState => ({
                    ...prevState,
                    data: action.payload,
                    updated: Date.now()
                })
            });
        }
        case ActionTypes.CREATE_SUBMISSION: {
            return {
                ...state,
                data: concat(state.data, action.payload)
            };
        }
        default:
            return state;
    }
}
