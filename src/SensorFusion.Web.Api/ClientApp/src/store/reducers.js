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

const sensorsMonitoringReducer = (state = [], action) => {
  switch (action.type) {
    case actions.sensors.setSensors:
      console.log("replaced", action.sensors)
      return action.sensors;
    case actions.sensors.addNewValue:
      const updatedSensor = {...action.sensor, lastValues: action.sensor.lastValues.concat([action.newValue])};
      const sensorsCopy = state.slice();
      for (let i=0; i<sensorsCopy.length; i++) {
        if (sensorsCopy[i].id === updatedSensor.id) {
          sensorsCopy[i] = updatedSensor;
        }
      }
      return sensorsCopy;
    default:
      return state;
  }
};

const reducers = history => combineReducers({
  router: connectRouter(history),
  userState: userReducer,
  userSettingsState: userSettingsReducer,
  sensorsMonitoring: sensorsMonitoringReducer
});

export default reducers;