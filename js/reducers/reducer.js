import { combineReducers } from 'redux';
import { login } from "../../sdk/sdk";
import { routerReducer } from 'react-router-redux';

function user(state = {user:"rohini"}, action) {
  switch (action.type) {
  case 'login':
    return action.user;
  case 'logout':
    return 
  default:
    return state
  }
}

export default combineReducers({
	user
})