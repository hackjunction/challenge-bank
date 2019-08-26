import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import content from './content/reducer';
import auth from './auth/reducer';
import filters from './filters/reducer';
import submissions from './submissions/reducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        content,
        auth,
        filters,
        submissions
    });
