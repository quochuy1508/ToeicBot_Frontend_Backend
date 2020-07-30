import {combineReducers} from 'redux';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  users: loginReducer,
});
export default rootReducer;
