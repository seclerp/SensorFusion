import React from "react";

import HomeIcon from "@material-ui/icons/Home"
import InsertChartOutlinedIcon from "@material-ui/icons/InsertChartOutlined"
import HelpOutlinedIcon from "@material-ui/icons/HelpOutlined"

export default [
  { type: "link", title: "Sensors", url: "/sensors", icon: (<HomeIcon/>) },
  { type: "link", title: "Monitoring", url: "/monitoring", icon: (<InsertChartOutlinedIcon/>) },
  { type: "link", title: "Help", url: "/help", icon: (<HelpOutlinedIcon/>) },
]