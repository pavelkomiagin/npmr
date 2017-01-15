// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import packages from './packages';

const rootReducer = combineReducers({
  counter,
  packages,
  routing
});

export default rootReducer;
