import React from 'react';
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SensorsPage from "./components/pages/SensorsPage";
import {connect, Provider} from "react-redux";
import SignInPage from "./components/pages/SignInPage";
import PrivateRoute from "./components/PrivateRoute";
import SignUpPage from "./components/pages/SignUpPage";

const App = (props) => {
  return (
    <Router>
      <div className="App">
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute path="/" exact component={SensorsPage} />
        <PrivateRoute path="/sensors/" component={SensorsPage} />
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.userState
});

export default connect(mapStateToProps)(App);