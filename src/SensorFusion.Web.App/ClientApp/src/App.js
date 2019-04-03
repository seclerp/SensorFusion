import React, {Component} from 'react';
import {Route} from 'react-router';
import Layout from './components/Layout';
import {Home} from './components/Home';
import {FetchData} from './components/FetchData';
import {Counter} from './components/Counter';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/styles";
import theme from './themes/Cyan'

const styles = theme => ({
  loading: {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh'
  }
});

class App extends Component {
  static displayName = App.name;

  state = {};

  componentDidMount() {
    axios.get(`/api/staticdata`)
      .then(res =>
        this.setState({staticdata: res.data})
      )
  }

  renderLoading = () => (
    <div className={this.props.classes.loading}>
      <CircularProgress size={64}/>
    </div>
  );

  renderApp = () => (
    <MuiThemeProvider theme={theme}>
      <Layout menu={this.state.staticdata.menu}>
        <Route exact path='/' component={Home}/>
        <Route path='/counter' component={Counter}/>
        <Route path='/fetch-data' component={FetchData}/>
      </Layout>
    </MuiThemeProvider>
  );

  render = () =>
    this.state.staticdata 
      ? this.renderApp() 
      : this.renderLoading();
}

export default withStyles(styles)(App);