import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {cyan} from "@material-ui/core/colors";

export default createMuiTheme({
    palette: {
        primary: { main: cyan[600] },
        secondary: { main: cyan[500] },
        type: "dark",
    },
    typography: { useNextVariants: true },
});