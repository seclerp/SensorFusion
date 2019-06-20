import React, {useContext, useEffect, useRef, useState} from 'react';
import {Container, makeStyles, Typography, withStyles} from "@material-ui/core"
import AppPage from "../AppPage";
import AppBarDrawer from "../AppBarDrawer";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Markdown from "markdown-to-jsx";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
  },
  paper: {
    padding: theme.spacing(2)
  },
}));

const legacyStyles = theme => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
});

const options = {
  overrides: {
    h1: { component: props => <Typography gutterBottom variant="h4" {...props} /> },
    h2: { component: props => <Typography gutterBottom variant="h6" {...props} /> },
    h3: { component: props => <Typography gutterBottom variant="subtitle1" {...props} /> },
    h4: { component: props => <Typography gutterBottom variant="caption" paragraph {...props} /> },
    p: { component: props => <Typography paragraph {...props} /> },
    a: { component: Link },
    li: {
      component: withStyles(legacyStyles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
  },
};

const MonitoringPage = (props) => {
  const classes = useStyles();

  return (
    <AppBarDrawer title={props.locales["howtouse"]}>
      <AppPage isLoading={false}>
        <Container className={classes.root}>
          <Paper className={classes.paper}>
            <Markdown options={options} {...props}>
              {props.locales["howtouseguide"]}
            </Markdown>
          </Paper>
        </Container>
      </AppPage>
    </AppBarDrawer>
  );
};

MonitoringPage.propTypes = {};

const mapStateToProps = state => ({
  locales: state.locales
});

export default connect(mapStateToProps)(withSnackbar(MonitoringPage));