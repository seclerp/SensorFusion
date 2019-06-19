import React, {useContext, useEffect, useRef, useState} from 'react';
import {Container, makeStyles} from "@material-ui/core"
import AppPage from "../AppPage";
import AppBarDrawer from "../AppBarDrawer";
import axios from "axios";
import {AppSettingsContext} from "../../contexts/AppSettingsContext";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import SensorMonitoringCard from "../SensorMonitoringCard";
import actionTypes from "../../store/actionTypes";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
  }
}));

const MonitoringPage = (props) => {
  const classes = useStyles();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sensorsDetailed, setSensorsDetailed] = useState([]);
  const [timeoutHandler, setTimeoutHandler] = useState();
  const {user} = props;
  const appSettings = useContext(AppSettingsContext);

  const loadSensors = () => {
    axios
      .get(appSettings.apiRoot + "/sensors/detailed", {headers: {
        "Authorization": "Bearer " + user.token
      }})
      .then(response => {
        console.log(response.data)
        setSensorsDetailed(response.data);
        setDataLoaded(true);
        setTimeoutHandler(setTimeout(loadSensors, 5000));
      })
      .catch(error => props.enqueueSnackbar(error.toString(), {variant: "error"}));
  };
  
  const unloadSensors = () => {
    return () => {
      clearTimeout(timeoutHandler);
    }
  };

  useEffect(loadSensors, []);
  useEffect(unloadSensors, [timeoutHandler]);

  return (
    <AppBarDrawer title={props.locales["monitoring"]}>
      <AppPage isLoading={!dataLoaded}>
        <Container className={classes.root}>
          {sensorsDetailed && sensorsDetailed.map(sensor => <SensorMonitoringCard id={sensor.id} name={sensor.name} valuesData={sensor.lastValues}/>)}
        </Container>
      </AppPage>
    </AppBarDrawer>
  );
};

MonitoringPage.propTypes = {};

const mapStateToProps = state => ({
  user: state.userState,
  sensors: state.sensorsMonitoring,
  locales: state.locales
});

export default connect(mapStateToProps)(withSnackbar(MonitoringPage));