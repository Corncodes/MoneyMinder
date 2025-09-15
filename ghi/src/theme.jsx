import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
// import { createTheme, colors, ThemeProvider } from "@mui/material";
import { purple, lightGreen } from "@mui/material/colors";
import Button from "@mui/material/Button";


const defaultTheme = createTheme({
  palette: {
    background: {
      default: purple[200],
    },

  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: lightGreen[500],
        },
      },
    },
  },
});

export default responsiveFontSizes(defaultTheme)
