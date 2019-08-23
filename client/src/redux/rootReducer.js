import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import content from './content/reducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        content,
    });
