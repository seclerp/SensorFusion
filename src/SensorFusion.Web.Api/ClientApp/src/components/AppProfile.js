import React, {useContext, useState} from 'react';
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {connect} from "react-redux";
import actionTypes from "../store/actionTypes";
import UserService from "../services/UserService";

const styles = theme => ({
  profileButton: {
    textTransform: 'none'
  },
  profileIcon: {
    marginRight: theme.spacing.unit
  },
  avatar: {
    margin: theme.spacing.unit
  }
});

const AppProfile = props => {
  const [ profileMenuOpened, setProfileMenuOpened ] = useState(false);
  const [ anchorEl, setAnchorEl ] = useState(null);
  const { classes, user } = props;

  const handleToggle = () => {
    setProfileMenuOpened(!profileMenuOpened);
  };

  const handleClose = event => {
    if (anchorEl.contains(event.target)) {
      return;
    }

    setProfileMenuOpened(false);
  };
  
  const handleLogout = () => {
    UserService.set(null);
    props.dispatch({
      type: actionTypes.users.setUser,
      email: null,
      token: null,
    });
  };

  return (
    <div className={classes.root}>
      <Button
        buttonRef={setAnchorEl}
        aria-owns={profileMenuOpened ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.profileButton}
        color="inherit"
      >
        <AccountCircleIcon className={classes.profileIcon}/>
        {user.email}
      </Button>
      <Popper open={profileMenuOpened} anchorEl={anchorEl} transition disablePortal>
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem component={Button} onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

AppProfile.propTypes = {
};

const mapStateToProps = state => ({
  user: state.userState
});

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(AppProfile));