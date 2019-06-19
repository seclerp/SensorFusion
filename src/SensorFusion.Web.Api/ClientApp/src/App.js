import React, {useContext, useEffect, useState} from 'react';
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SensorsPage from "./components/pages/SensorsPage";
import {connect} from "react-redux";
import SignInPage from "./components/pages/SignInPage";
import PrivateRoute from "./components/PrivateRoute";
import SignUpPage from "./components/pages/SignUpPage";
import SensorEditPage from "./components/pages/SensorEditPage";
import MonitoringPage from "./components/pages/MonitoringPage";
import SensorDetailsPage from "./components/pages/SensorDetailsPage";
import {AppSettingsContext} from "./contexts/AppSettingsContext";
import axios from "axios";
import actionTypes from "./store/actionTypes";

const App = props => {
  const appSettings = useContext(AppSettingsContext);
  
  const language = "ua";
  
  useEffect(() => {
    axios
      .get(`${appSettings.locales}?language=${language}`)
      .then(response => {
        props.dispatch({ type: actionTypes.locales.setLocales, locales: response.data});
      })
      .catch(error => console.error(error));
  }, []);
  
  return !props.locales ? (<div/>) : (
    <Router>
      <div className="App">
        <Route exact path="/signin" component={SignInPage}/>
        <Route exact path="/signup" component={SignUpPage}/>
        <PrivateRoute exact path="/" component={SensorsPage}/>
        <PrivateRoute exact path="/sensors" component={SensorsPage}/>
        <PrivateRoute exact path="/sensors/:id" component={SensorEditPage}/>
        <PrivateRoute exact path="/monitoring" component={MonitoringPage}/>
        <PrivateRoute exact path="/monitoring/:id" component={SensorDetailsPage}/>
        <PrivateRoute exact path="/settings" component={MonitoringPage}/>
        <PrivateRoute exact path="/help" component={MonitoringPage}/>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.userState,
  locales: state.locales
});

export default connect(mapStateToProps)(App);