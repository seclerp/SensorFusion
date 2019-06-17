import React from "react";

import VideoLabelIcon from "@material-ui/icons/VideoLabel"
import HomeIcon from "@material-ui/icons/Home"
import PeopleIcon from "@material-ui/icons/People"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import ChatIcon from "@material-ui/icons/Chat"
import LocalAtmIcon from "@material-ui/icons/LocalAtm"
import HistoryIcon from "@material-ui/icons/History"
import ListIcon from "@material-ui/icons/List"
import AssessmentIcon from "@material-ui/icons/Assessment"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import CakeIcon from "@material-ui/icons/Cake"
import TuneIcon from "@material-ui/icons/Tune"
import UpdateIcon from "@material-ui/icons/Update"
import LiveHelpIcon from "@material-ui/icons/LiveHelp"

export default [
  { type: "link", title: "Home", icon: (<HomeIcon/>) },
  { type: "link", title: "Sensors", icon: (<HomeIcon/>) },
  { type: "link", title: "Reports", icon: (<HomeIcon/>) },
]

// export default [
//   { type: "link", title: "Home", icon: (<HomeIcon/>) },
//   { type: "section", title: "VIP Users", icon: (<PeopleIcon/>), items: [
//       { type: "link", title: "VIP Users", icon: (<PeopleIcon/>) },
//       { type: "link", title: "Profile", icon: (<AccountCircleIcon/>) },
//       { type: "link", title: "Chat", icon: (<ChatIcon/>) },
//       { type: "link", title: "Tasks", icon: (<CakeIcon/>) },
//     ] },
//   { type: "link", title: "VIP Agents", icon: (<PeopleIcon/>) },
//   { type: "section", title: "Offers", icon: (<LocalAtmIcon/>), items: [
//       { type: "link", title: "Balance", icon: (<ListIcon/>) },
//       { type: "link", title: "History", icon: (<HistoryIcon/>) },
//     ] },
//   { type: "section", title: "Processing", icon: (<UpdateIcon/>), items: [
//       { type: "link", title: "Processing", icon: (<UpdateIcon/>) },
//       { type: "link", title: "Variables", icon: (<TuneIcon/>) },
//     ] },
//   { type: "link", title: "Reports", icon: (<AssessmentIcon/>) },
//   { type: "section", title: "Administration", icon: (<AssignmentIndIcon/>), items: [
//       { type: "link", title: "Admin Panel", icon: (<PeopleIcon/>) },
//       { type: "link", title: "Admin Users", icon: (<PeopleIcon/>) },
//     ] },
//   { type: "section", title: "External links", icon: (<OpenInNewIcon/>), items: [
//       { type: "link", title: "Console", icon: (<VideoLabelIcon />),
//         isExternal: true, url: "https://gbo.x-plarium.com/games/console"},
//       { type: "link", title: "Users", icon: (<PeopleIcon />),
//         isExternal: true, url: "https://gbo.x-plarium.com/games/users"},
//       { type: "link", title: "User Activity", icon: (<PeopleIcon/>),
//         isExternal: true, url: "https://gbo.x-plarium.com/games/useractivity" },
//       { type: "link", title: "User Activity Archive", icon: (<PeopleIcon/>),
//         isExternal: true, url: "https://gbo.x-plarium.com/games/useractivityarchive" },
//     ] },
//   { type: "link", title: "F.A.Q.", icon: (<LiveHelpIcon/>) },
//   { type: "divider" },
// ];