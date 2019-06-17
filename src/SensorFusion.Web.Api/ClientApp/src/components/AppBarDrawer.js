import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppMenu from './AppMenu';
import AppMenuHeader from './AppMenuHeader';
import menuData from "../data/menu";
import LeakAddIcon from "@material-ui/icons/LeakAdd";
import AppLoading from "./AppLoading";
import {connect} from "react-redux";
import AppProfile from "./AppProfile";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  titleContainer: {
    flexGrow: 1,
  }
}));

function AppBarDrawer(props) {
  const classes = useStyles();
  const { title } = props;
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.titleContainer}>
            {title}
          </Typography>
          <AppProfile/>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <AppMenuHeader title="SensorFusion" icon={<LeakAddIcon className={classes.icon}/>} />
        <Divider />
        <AppMenu items={menuData}/>
      </Drawer>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
}

const mapStateToProps = store => ({
  // title: store.appState.title
});

export default connect(mapStateToProps)(AppBarDrawer);