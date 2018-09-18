import { combineReducers } from 'redux';
import user from './user';
import admin from './admin';
import scores from './scores';

export default combineReducers({
    user,
    admin,
    scores
});
