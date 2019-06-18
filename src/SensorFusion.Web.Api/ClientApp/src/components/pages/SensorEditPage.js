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

const SensorEditPage = (props) => {
  const classes = useStyles();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sensor, setSensor] = useState(null);
  const {user} = props;
  const appSettings = useContext(AppSettingsContext);
  const { match: { params } } = props;

  const loadSensor = () => {
    axios
      .get(`${appSettings.apiRoot}/sensors/detailed/${params.id}`, {headers: {
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
        </Container>
      </AppPage>
    </AppBarDrawer>
  );
};

SensorEditPage.propTypes = {};

const mapStateToProps = state => ({
  user: state.userState
});

export default connect(mapStateToProps)(withSnackbar(SensorEditPage));