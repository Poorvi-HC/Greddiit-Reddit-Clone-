import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
let theme = createTheme({
  palette: {
    primary: {
      main: '#EE6E01',
    },
    secondary: {
      main: '#EE6E01',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
