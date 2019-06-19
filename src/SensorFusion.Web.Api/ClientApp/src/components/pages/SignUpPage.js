import React, {Component, useContext, useEffect, useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import LeakAddIcon from "@material-ui/icons/LeakAdd";
import Avatar from '@material-ui/core/Avatar'

import { makeStyles } from "@material-ui/core/styles";
import {useSnackbar, withSnackbar} from "notistack";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {AppSettingsContext} from "../../contexts/AppSettingsContext";
import {connect} from "react-redux";
import actionTypes from "../../store/actionTypes";
import UserService from "../../services/UserService";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  paper: {
    height: 380,
    width: 300,
    textAlign: "center",
    padding: theme.spacing(3)
  },
  avatarContainer: {
    marginBottom: theme.spacing(2)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    margin: theme.spacing(2)
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

function SignInPage(props) {
  const classes = useStyles();
  const appSettings = useContext(AppSettingsContext);
  const [ email, setEmail ] = useState("a.rublov@plarium.com");
  const [ password, setPassword ] = useState("Yu12345!");
  const [ repeatedPassword, setRepeatedPassword ] = useState("Yu12345!");
  const { enqueueSnackbar } = useSnackbar();

  const trySignUp = () => {
    if (password !== repeatedPassword) {
      enqueueSnackbar("Passwords not match", {variant: "error"});
      return;
    }

    axios
      .post(appSettings.apiRoot + "/account/signUp", {
        email: email,
        password: password
      })
      .then(response => {
        props.history.push("/");
      })
      .catch(error => enqueueSnackbar(error.response.data.error, {variant: "error"}));
  }


  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid key="auth" item>
          <Paper className={classes.paper}>
            <Grid container justify="center" alignItems="center" className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>
                <LeakAddIcon />
              </Avatar>
            </Grid>
            <Typography variant="h6">
              {props.locales["signuptitle"]}
            </Typography>
            <TextField
              id="outlined-email-input"
              label={props.locales["email"]}
              // className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label={props.locales["password"]}
              // className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              id="outlined-repeated-password-input"
              label={props.locales["repeatpassword"]}
              // className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              value={repeatedPassword}
              onChange={event => setRepeatedPassword(event.target.value)}
            />
            <Grid container justify="center" alignItems="center">
              <Button variant="contained" color="secondary" className={classes.button} onClick={trySignUp}>
                {props.locales["signup"]}
              </Button>
              <Button color="primary" component={Link} to="/signin" className={classes.button}>
                {props.locales["signin"]}
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>  
    </div>
  );
}

const mapStateToProps = state => ({
  locales: state.locales
});


export default connect(mapStateToProps)(withSnackbar(SignInPage));