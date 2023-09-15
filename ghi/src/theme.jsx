import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// import { createTheme, colors, ThemeProvider } from "@mui/material";
import { purple, lightGreen } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#283618",
    },
    secondary: {
      main: "#BC6C25",
    },
    warning: {
      main: "#922a15",
    },
    background: {
      default: "#FEFAE0",
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "#606C38",
          color: "#ffffff",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: "#344620",
          color: "#ffffff",
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: "#000",
          backgroundColor: "#000"
        }
      },
    },
    MuiPieChart: {
      styleOverrides: {
        root: {
          stroke: "#000000"
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
