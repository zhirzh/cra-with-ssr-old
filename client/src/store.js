import { createStore } from 'redux';

import rootReducer from './reducer';

const initialState = window.__INITIAL_STATE__;

const store = createStore(rootReducer, initialState);

export default store;
