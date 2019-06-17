import React from "react";
import {
  makeStyles,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

function AppMenuHeader(props) {
  const {title, icon} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {icon}
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
    </div>
  );
}

AppMenuHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default AppMenuHeader;