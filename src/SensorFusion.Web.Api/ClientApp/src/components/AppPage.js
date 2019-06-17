import React from 'react';
import {makeStyles} from "@material-ui/core"
import PropTypes from "prop-types";
import AppLoading from "./AppLoading";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

function AppPage(props) {
  const classes = useStyles();

  const renderLoading = () =>
    <AppLoading/>;

  const renderContent = () =>
    <div style={{height: "100%"}}>
      <div className={classes.toolbar} />
      {props.children}
    </div>;

  return !props.isLoading ? renderContent() : renderLoading();
}

AppPage.propTypes = {
  isLoading: PropTypes.bool
};

export default AppPage;