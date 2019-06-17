import React, {useState} from 'react';
import {
  makeStyles,
  CircularProgress
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

function AppLoading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

export default AppLoading;