import React, {useContext, useEffect, useRef, useState} from 'react';
import {Container, Grid, makeStyles, Typography, withStyles} from "@material-ui/core"
import AppPage from "../AppPage";
import AppBarDrawer from "../AppBarDrawer";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Markdown from "markdown-to-jsx";
import {Link} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import langs from "../../data/langs";
import axios from "axios";
import actionTypes from "../../store/actionTypes";
import {AppSettingsContext} from "../../contexts/AppSettingsContext";

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

const SettingsPage = (props) => {
  const classes = useStyles();
  const appSettings = useContext(AppSettingsContext);
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "english");
  
  return (
    <AppBarDrawer title={props.locales["settings"]}>
      <AppPage isLoading={false}>
        <Container className={classes.root} maxWidth="sm">
          <Paper className={classes.paper}>
            <Grid container
                  direction="column"
                  alignItems="center"
                  justify="center">
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="language-simple">{props.locales["language"]}</InputLabel>
                  <Select
                    value={language}
                    onChange={e => {
                      axios
                        .get(`${appSettings.locales}?language=${language}`)
                        .then(response => {
                          props.dispatch({ type: actionTypes.locales.setLocales, locales: response.data});
                          localStorage.setItem("lang", e.target.value);
                          setLanguage(e.target.value);
                          window.location.reload();
                        })
                        .catch(error => console.error(error));
                    }}
                    inputProps={{
                      name: 'language',
                      id: 'language-simple',
                    }}
                  >
                    {langs.map(lang => <MenuItem value={lang}>{props.locales[lang]}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </AppPage>
    </AppBarDrawer>
  );
};

SettingsPage.propTypes = {};

const mapStateToProps = state => ({
  locales: state.locales
});

export default connect(mapStateToProps)(withSnackbar(SettingsPage));