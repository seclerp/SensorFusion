import React from "react";

import HomeIcon from "@material-ui/icons/Home"
import InsertChartOutlinedIcon from "@material-ui/icons/InsertChartOutlined"
import HelpOutlinedIcon from "@material-ui/icons/HelpOutlined"
import SettingsIcon from "@material-ui/icons/Settings"

export default [
  { type: "link", title: "sensors", url: "/sensors", icon: (<HomeIcon/>) },
  { type: "link", title: "monitoring", url: "/monitoring", icon: (<InsertChartOutlinedIcon/>) },
  { type: "link", title: "settings", url: "/settings", icon: (<SettingsIcon/>) },
  { type: "link", title: "help", url: "/help", icon: (<HelpOutlinedIcon/>) },
]