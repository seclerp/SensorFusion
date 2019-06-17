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
  const {user} = props;
  const appSettings = useContext(AppSettingsContext);
  const { match: { params } } = props;

  const loadSensor = () => {
    axios
      .get(`${appSettings.apiRoot}/sensors/${params.id}`, {headers: {
          "Authorization": "Bearer " + user.token
        }})
      .then(response => {
        setSensor(response.data);
        setDataLoaded(true);
        console.log(response.data);
      })
      .catch(error => props.enqueueSnackbar(error.response.data.error, {variant: "error"}));
  };

  useEffect(loadSensor, []);

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
            <Grid container spacing={2} className={classes.editContainer}>
              <Grid item xs={3}>
                <TextField
                  id="outlined-name-input"
                  label="Name"
                  type="text"
                  name="name"
                  margin="normal"
                  variant="outlined"
                  value={sensor && sensor.name}
                  fullWidth
                  onChange={event => setSensor({...sensor, name: event.target.value})}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-key-input"
                  label="Key"
                  type="text"
                  name="key"
                  margin="normal"
                  variant="outlined"
                  disabled
                  fullWidth
                  value={sensor && sensor.key}
                  onChange={event => setSensor({...sensor, name: event.target.value})}
                />
              </Grid>
              <Grid item xs>
                <Button fullWidth variant="contained" color="primary" onClick={saveChanges}>
                  Save
                </Button>
              </Grid>
              <Grid item xs>
                <Button fullWidth variant="contained" color="secondary" onClick={deleteSensor}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper2}>
            {sensor && sensor.lastValues.length > 0 ? (
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="h6">
                    Current value: <br /><b>{sensor.lastValues[0].value}</b>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
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
                            {new Date(value.valueSent).toLocaleString('en-US', { timeZone: 'UTC' })}
                          </TableCell>
                          <TableCell align="right">{value.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            ) : (
                <Typography>There is no values for this sensor</Typography>
            )}
          </Paper>
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