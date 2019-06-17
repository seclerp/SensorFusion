import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import actions from './actionTypes';
import UserService from "../services/UserService";

const userReducer = (state = UserService.get() || null, action) => {
  switch (action.type) {
    case actions.users.setUser:
      return { ...state, email: action.email, token: action.token };
    default:
      return state;
  }
};

const userSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.userSettings.changeTheme:
      return { ...state, themeName: action.themeName};
    default:
      return state;
  }
};

const reducers = history => combineReducers({
  router: connectRouter(history),
  userState: userReducer,
  userSettingsState: userSettingsReducer
});

export default reducers;