import { combineReducers } from 'redux';

import foo from './foo';
import name from './name';

const rootRducer = combineReducers({
  foo,
  name,
});

export default rootRducer;
