import { combineReducers } from 'redux';
import user from './user';
import admin from './admin';
import events from './events';
import submissions from './submissions';

export default combineReducers({
    user,
    admin,
    events,
    submissions
});
