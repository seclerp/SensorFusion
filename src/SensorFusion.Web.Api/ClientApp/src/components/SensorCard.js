import React, {useContext} from 'react';
import {CardHeader, makeStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import {AppSettingsContext} from "../contexts/AppSettingsContext";
import {withSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
  card: {
    width: 275,
    margin: theme.spacing(2)
  },
  cardHeader: {
    paddingBottom: 0
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const SensorCard = props => {
  const classes = useStyles();
  const appSettings = useContext(AppSettingsContext);
  const {user, onDeleted} = props;

  const handleDelete = () => {
    axios
      .delete(`${appSettings.apiRoot}/sensors/${props.id}`, {
        headers: {
          "Authorization": "Bearer " + user.token
        }
      })
      .then(response => {
        props.enqueueSnackbar("Sensor successfully deleted");
        onDeleted();
      })
      .catch(error => props.enqueueSnackbar(error.toString(), {variant: "error"}));
  };
  
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        action={
          <div>
            <IconButton aria-label={props.locales["edit"]} component={Link} to={`/sensors/${props.id}`}>
              <EditIcon />
            </IconButton>
            {/* TODO */}
            <IconButton aria-label={props.locales["delete"]} onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        }
        title={
          <div>
            <Typography variant="h5" component="h2" >
              {props.name}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {props.locales["numeric"]}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {props.locales["enabled"]}
            </Typography>
          </div>
        }
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {props.locales["currentvalue"]}: <b>{props.value ? props.value : props.locales["novalues"]}</b>
        </Typography>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.userState,
  locales: state.locales
});

export default connect(mapStateToProps)(withSnackbar(SensorCard));