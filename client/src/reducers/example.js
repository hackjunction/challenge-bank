import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    testThingy: 'foo'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.TEST_ACTION:
            return {
                ...state,
                testThingy: action.payload
            };
        default:
            return state;
    }
};
