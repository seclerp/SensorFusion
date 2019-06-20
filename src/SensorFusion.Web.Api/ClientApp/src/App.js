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
import HowToUsePage from "./components/pages/HowToUsePage";
import SettingsPage from "./components/pages/SettingsPage";

const App = props => {
  const appSettings = useContext(AppSettingsContext);
  
  const language = localStorage.getItem("lang") || "en";
  
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
        <PrivateRoute exact path="/settings" component={SettingsPage}/>
        <PrivateRoute exact path="/how-to-use" component={HowToUsePage}/>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.userState,
  locales: state.locales
});

export default connect(mapStateToProps)(App);