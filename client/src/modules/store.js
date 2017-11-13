import { createStore } from 'redux';

import rootReducer from '../reducers/root-reducer';

function createStoreWithState(initialState) {
  const store = createStore(rootReducer, initialState);

  return store;
}

export default createStoreWithState;
