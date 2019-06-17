import React from "react";
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from "@material-ui/core/Chip";
import Link from '@material-ui/core/Link';
import AppMenuSection from "./AppMenuSection";

const useStyles = makeStyles(themes => ({
  menuItem: {
    display: "flex"
  }
}));

function AppMenu(props) {
  const classes = useStyles();
  const { items } = props;

  const renderMenuItem = (item, index) => {
    switch (item.type) {
      case "section":
        return (
          <AppMenuSection title={item.title} icon={item.icon}>
            {item.items.map(renderMenuItem)}
          </AppMenuSection>
        );
      case "divider":
        return <Divider />;
      case "link":
        return (
          <div>
            <ListItem
              dense
              button
              component={Link}
              style={{ textDecoration: 'none' }}
              key={index}
              href={item.isExternal && item.url}
              target={item.isExternal && "_blank"}
              className={classes.menuItem}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              {item.chips && item.chips.map(chip => <Chip className={classes.chip} label={chip} />)}
              <ListItemText primary={item.title} />
            </ListItem>
          </div>
        );
    }
  }

  return (
    <List>
      {items.map(renderMenuItem)}
    </List>
  );
}

export default AppMenu;