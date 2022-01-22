import { combineReducers } from 'redux';
import alert from './alert';
import {reducer as auth} from './auth';
import board from './board';


export default combineReducers({ alert, auth, board});