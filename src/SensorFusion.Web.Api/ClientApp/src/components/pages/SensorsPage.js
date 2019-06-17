import React, {useContext, useEffect, useState} from 'react';
import {Container, makeStyles} from "@material-ui/core"
import PropTypes from "prop-types";
import AppPage from "../AppPage";
import AppBarDrawer from "../AppBarDrawer";
import axios from "axios";
import {AppSettingsContext} from "../../contexts/AppSettingsContext";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import SensorCard from "../SensorCard";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const SensorsPage = (props) => {
  const classes = useStyles();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sensors, setSensors] = useState([]);
  const {user} = props;
  const appSettings = useContext(AppSettingsContext);

  const loadSensors = () => {
    axios
      .get(appSettings.apiRoot + "/sensors", {headers: {
        "Authorization": "Bearer " + user.token
        }})
      .then(response => {
        setSensors(response.data);
        setDataLoaded(true);
      })
      .catch(error => props.enqueueSnackbar(error.response, {variant: "error"}));
  };

  useEffect(loadSensors, []);

  return (
    <AppBarDrawer title="App">
      <AppPage isLoading={!dataLoaded}>
        <Container className={classes.root}>
          {sensors.map(sensor => <SensorCard name={sensor.name} value={sensor.lastValue}/>)}
        </Container>
      </AppPage>
    </AppBarDrawer>
  );
}

SensorsPage.propTypes = {};

const mapStateToProps = state => ({
  user: state.userState
});

export default connect(mapStateToProps)(withSnackbar(SensorsPage));