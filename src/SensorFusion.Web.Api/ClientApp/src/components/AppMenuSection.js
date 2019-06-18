import React, {Componen, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
  }
}));

function AppMenuSection(props) {
  const classes = useStyles();
  const { children, title, icon } = props;

  const [isOpened, setIsOpened] = useState(props.isOpened && false);
  
  const handleSectionClick = () => setIsOpened(!isOpened);

  return (
    <div>
      <ListItem dense button onClick={handleSectionClick}>
        {icon && <ListItemIcon style={{marginRight: '0px'}}>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
        {isOpened ? <ExpandLess/> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpened} timeout="auto" unmountOnExit>
        <List className={classes.root} disablePadding>
          {children}
        </List>
      </Collapse>
    </div>
  )
}

AppMenuSection.propTypes = {
  title: PropTypes.string,
  isOpened: PropTypes.bool
};

export default AppMenuSection;