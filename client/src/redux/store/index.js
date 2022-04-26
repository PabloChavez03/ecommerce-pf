import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

//el thunk recibe las actions-creators que son functions
const middleware = [thunk];

const store = configureStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;