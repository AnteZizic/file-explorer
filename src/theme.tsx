import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const BLUE_COLOR = {
  main: '#4c9cd3',
  contrastText: '#fff'
};

const RED_COLOR = {
  main: red[900]
};

const BLACK_COLOR = {
  primary: '#484848',
  secondary: 'rgba(0, 0, 0, 0.54)',
  disabled: 'rgba(0, 0, 0, 0.38)',
  hint: 'rgba(0, 0, 0, 0.38)'
};

const palette = {
  common: {
    black: '#000',
    white: '#fff'
  },
  background: {
    paper: '#fff',
    default: '#fff'
  },
  primary: { main: '#325272' },
  secondary: BLUE_COLOR,
  error: RED_COLOR,
  text: BLACK_COLOR
};

// A custom theme for this app
const theme = createMuiTheme({
  palette,
  // shadows: Array(25).fill('none') as any,
  typography: {
    fontFamily: "'Varela Round', sans-serif",
    subtitle2: {
      fontWeight: 800
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#fff'
        },
      }
    },
    MuiDialogContent: {
      root: {
        position: 'relative'
      }
    }
  },
  props: {
    MuiButton: {
      disableElevation: true,
    }
  }
});

export default theme;
