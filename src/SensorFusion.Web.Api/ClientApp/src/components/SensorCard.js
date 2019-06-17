import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

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
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/sensors/${props.id}`} size="small">Edit</Button>
        <Button component={Link} to={`/monitoring/${props.id}`} size="small">Details</Button>
      </CardActions>
    </Card>
  );
}

export default SensorCard;