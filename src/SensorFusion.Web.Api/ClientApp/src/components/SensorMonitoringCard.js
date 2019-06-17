import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SensorLineChart from "./SensorLineChart";

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chartContainer: {
    height: "200px"
  }
}));

const SensorMonitoringCard = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.card} >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Numeric
          </Typography>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Enabled
          </Typography>
          <Typography variant="body2" component="p">
            Current value: <b>{props.value ? props.value : "No values yet"}</b>
          </Typography>
          <Grid container>
            <Button component={Link} to={`/sensors/${props.id}`} size="small">Edit</Button>
            <Button component={Link} to={`/monitoring/${props.id}`} size="small">Details</Button>
          </Grid>
        </Grid>
        <Grid item xs={8} className={classes.chartContainer}>
          { props.valuesData && <SensorLineChart valuesData={props.valuesData}/> }
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SensorMonitoringCard;