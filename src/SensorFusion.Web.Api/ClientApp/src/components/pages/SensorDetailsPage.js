import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid, makeStyles, Paper, Typography} from "@material-ui/core"
import AppPage from "../AppPage";
import {AppSettingsContext} from "../../contexts/AppSettingsContext";
import axios from "axios";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import AppBarDrawer from "../AppBarDrawer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DateHelper from "../../services/DateHelper";
import SensorLineChart from "../SensorLineChart";

const useStyles = makeStyles(theme => ({
  editContainer: {
    alignItems: "center"
  },
  paper: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(1)
  },
  paper2: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  }
}));

const SensorDetailsPage = (props) => {
  const classes = useStyles();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sensor, setSensor] = useState(null);
  const [timeoutHandler, setTimeoutHandler] = useState();
  const {user} = props;
  const appSettings = useContext(AppSettingsContext);
  const {match: {params}} = props;

  const loadSensor = () => {
    axios
      .get(`${appSettings.apiRoot}/sensors/detailed/${params.id}`, {
        headers: {
          "Authorization": "Bearer " + user.token
        }
      })
      .then(response => {
        setSensor(response.data);
        setDataLoaded(true);
        console.log(response.data);
        setTimeoutHandler(setTimeout(loadSensor, 5000));
      })
      .catch(error => props.enqueueSnackbar(error.response.data.error, {variant: "error"}));
  };

  const unloadSensors = () => {
    return () => {
      clearTimeout(timeoutHandler);
    }
  };
  
  useEffect(loadSensor, []);
  useEffect(unloadSensors, [timeoutHandler]);

  const saveChanges = () => {
    axios
      .put(`${appSettings.apiRoot}/sensors/rename`, {
        id: sensor.id,
        name: sensor.name
      }, {
        headers: {
          "Authorization": "Bearer " + user.token
        }
      })
      .then(response => {
        props.enqueueSnackbar("Sensor successfully updated")
      })
      .catch(error => props.enqueueSnackbar(error.response.data.error, {variant: "error"}));
  };

  const deleteSensor = () => {
    axios
      .delete(`${appSettings.apiRoot}/sensors/${sensor.id}`, {
        headers: {
          "Authorization": "Bearer " + user.token
        }
      })
      .then(response => {
        props.enqueueSnackbar("Sensor successfully deleted");
        props.history.push("/sensors");
      })
      .catch(error => props.enqueueSnackbar(error.response.data.error, {variant: "error"}));
  };

  return (
    <AppBarDrawer title={sensor !== null ? `Sensor '${sensor.name}'` : `Loading sensor ${params.id}...`}>
      <AppPage isLoading={!dataLoaded}>
        <Container className={classes.root} maxWidth="md">
          <Paper className={classes.paper}>
            {sensor && <SensorLineChart valuesData={sensor.lastValues}/>}
          </Paper>
          {sensor && sensor.lastValues.length > 0 ? (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper className={classes.paper2}>
                  <Typography variant="h6">
                    Current value: <br/><b>{sensor.lastValues[0].value}</b>
                  </Typography>
                </Paper>
                <Paper className={classes.paper2}>
                  <Typography variant="body1">
                    Values count: <b>{sensor.valuesCount}</b>
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper className={classes.paper2}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Time sent</TableCell>
                        <TableCell align="right">Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sensor && sensor.lastValues.map(value => (
                        <TableRow key={`${value.value}${value.valueSent}`}>
                          <TableCell component="th" scope="row">
                            {DateHelper.format(value.valueSent)}
                          </TableCell>
                          <TableCell align="right">{value.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Typography>There is no values for this sensor</Typography>
          )}
        </Container>
      </AppPage>
    </AppBarDrawer>
  );
};

SensorDetailsPage.propTypes = {};

const mapStateToProps = state => ({
  user: state.userState
});

export default connect(mapStateToProps)(withSnackbar(SensorDetailsPage));