import * as ActionTypes from "./actionTypes";

const initialState = {
  user: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN: {
      return {
        ...state,
        user: action.payload
      };
    }
    case ActionTypes.LOGOUT: {
      return {
        ...state,
        user: null
      };
    }
    default:
      return state;
  }
}
