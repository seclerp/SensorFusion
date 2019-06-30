import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import { AppSettingsProvider } from './contexts/AppSettingsContext';
import LocalSettings from "./env/local";
import {Provider as ReduxProvider} from "react-redux";
import configureStore, { history } from "./store/configure"
import {SnackbarProvider} from "notistack";

const currentSettings = LocalSettings;

const store = configureStore({});

ReactDOM.render(
  <AppSettingsProvider value={currentSettings}>
    <ReduxProvider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ReduxProvider>
  </AppSettingsProvider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
