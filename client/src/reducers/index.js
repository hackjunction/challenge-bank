import { combineReducers } from 'redux';
import user from './user';
import admin from './admin';

export default combineReducers({
    user,
    admin
});
