import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
  card: {
    width: 275,
    margin: theme.spacing(2)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.locales["numeric"]}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.locales["enabled"]}
        </Typography>
        <Typography variant="body2" component="p">
          {props.locales["currentvalue"]}: <b>{props.value ? props.value : props.locales["novalues"]}</b>
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/sensors/${props.id}`} size="small">{props.locales["edit"]}</Button>
        <Button component={Link} to={`/monitoring/${props.id}`} size="small">{props.locales["delete"]}</Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = state => ({
  locales: state.locales
});

export default connect(mapStateToProps)(SensorCard);