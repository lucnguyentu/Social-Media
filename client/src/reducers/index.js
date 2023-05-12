import { combineReducers } from 'redux';
// this will combine all the reducers we have made in our project

import authReducer from './AuthReducer';
import postReducer from './PostReducer';

export const reducers = combineReducers({ authReducer, postReducer });
