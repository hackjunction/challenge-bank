import * as ActionTypes from './actionTypes';
import {handle} from 'redux-pack';

const initialState = {
    content: {},
    syncId: null,
    loading: false,
    error: false,
    updated: 0,
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.UPDATE_CONTENT: {
            return handle(state, action, {
                start: prevState => ({
                    ...prevState,
                    loading: true,
                    error: false,
                }),
                finish: prevState => ({
                    ...prevState,
                    loading: false,
                }),
                failure: prevState => ({
                    ...prevState,
                    error: true
                }),
                success: prevState => {
                    if (!action.payload) return state;
                    return {
                        ...state,
                        content: action.payload.content,
                        syncId: action.payload.lastSyncId,
                        updated: Date.now(),
                    }
                }
            });
        }
        default: return state;
    }
}