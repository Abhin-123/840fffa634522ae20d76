// this. File combines all reducer and export them
import { combineReducers } from 'redux';
import * as login_reducer from './login_reducer';




const appReducer = combineReducers(Object.assign(
    login_reducer,

));

export default appReducer;
