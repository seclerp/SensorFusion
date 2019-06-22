import React from 'react';
import {CardHeader, makeStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import SensorLineChart from "./SensorLineChart";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  cardHeader: {
    paddingBottom: 0
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
}));

const SensorMonitoringCard = props => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={
          <div>
            <Typography variant="h5" component="h2" >
              {props.name}
            </Typography>
          </div>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={3} zeroMinWidth>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {props.locales["numeric"]}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {props.locales["enabled"]}
            </Typography>
            <Typography variant="body2" component="p">
              {props.locales["currentvalue"]}:<br/><b>{props.valuesData && props.valuesData.length > 0 ? props.valuesData[0].value : props.locales["novalues"]}</b>
            </Typography>
          </Grid>
          <Grid item md={8}>
            { props.valuesData && <SensorLineChart valuesData={props.valuesData}/> }
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/monitoring/${props.id}`} variant="outlined" color="primary">{props.locales["details"]}</Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = state => ({
  locales: state.locales
});

export default connect(mapStateToProps)(SensorMonitoringCard);