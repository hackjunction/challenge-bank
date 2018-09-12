import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, purgeStoredState } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';
import rootReducer from './reducers/';

const persistConfig = {
    key: 'root',
    storage
};

// Uncomment to clear stored state
purgeStoredState(persistConfig);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor };
};
