import React, {useContext, useEffect, useState} from 'react';
import {Container, makeStyles} from "@material-ui/core"
import AppPage from "../AppPage";
import AppBarDrawer from "../AppBarDrawer";
import axios from "axios";
import {AppSettingsContext} from "../../contexts/AppSettingsContext";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import SensorCard from "../SensorCard";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  addButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

const SensorsPage = (props) => {
  const classes = useStyles();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [addSensorOpened, setAddSensorOpened] = useState(false);
  const [timeoutHandler, setTimeoutHandler] = useState();
  const [newSensorName, setNewSensorName] = useState("");
  const {user} = props;
  const appSettings = useContext(AppSettingsContext);

  const handleClickOpen = () => {
    setAddSensorOpened(true);
  };

  const handleClose = () => {
    setAddSensorOpened(false);
  };

  const handleCreate = () => {
    setAddSensorOpened(false);
    axios
      .post(`${appSettings.apiRoot}/sensors/create`, {
        name: newSensorName
      }, {
        headers: {
          "Authorization": "Bearer " + user.token
        }
      })
      .then(response => {
        props.enqueueSnackbar(`Successfully created a new sensor called '${newSensorName}'`);
        loadSensors();
      })
      .catch(error => props.enqueueSnackbar(error.response, {variant: "error"}));
  };
  
  const loadSensors = () => {
    axios
      .get(appSettings.apiRoot + "/sensors", {headers: {
        "Authorization": "Bearer " + user.token
        }})
      .then(response => {
        setSensors(response.data);
        setDataLoaded(true);
        setTimeoutHandler(setTimeout(loadSensors, 5000));
      })
      .catch(error => props.enqueueSnackbar(error.response, {variant: "error"}));
  };

  const unloadSensors = () => {
    return () => {
      clearTimeout(timeoutHandler);
    }
  };
  
  useEffect(loadSensors, []);
  useEffect(unloadSensors, [timeoutHandler]);

  return (
    <AppBarDrawer title="Your sensors">
      <AppPage isLoading={!dataLoaded}>
        <Container className={classes.root}>
          {sensors.map(sensor => <SensorCard id={sensor.id} name={sensor.name} value={sensor.lastValue}/>)}
          <Fab color="primary" aria-label="Add" className={classes.addButton} onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Container>
        <Dialog open={addSensorOpened} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create a new sensor</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select name for your sensor
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Sensor's name"
              type="text"
              fullWidth
              value={newSensorName}
              onChange={e => setNewSensorName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </AppPage>
    </AppBarDrawer>
  );
};

SensorsPage.propTypes = {};

const mapStateToProps = state => ({
  user: state.userState
});

export default connect(mapStateToProps)(withSnackbar(SensorsPage));