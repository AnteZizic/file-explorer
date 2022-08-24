import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const GREEN_COLOR = {
  main: '#4caf50',
  contrastText: '#fff'
};

const RED_COLOR = {
  main: red[900]
};

const BLACK_COLOR = {
  primary: 'rgba(0, 0, 0, 0.87)',
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
    default: '#eee'
  },
  primary: { main: '#325272' },
  secondary: GREEN_COLOR,
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
        '.swal2-container': {
          'z-index': '1301 !important'
        },
        'tbody.MuiTableBody-root >:nth-of-type(2n)': {
          backgroundColor: 'rgba(0,0,0,.02)'
        },
        body: {
          backgroundColor: '#f7f9fc'
        },
        '.bpmn-palette-item': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        '.bpmn-context-pad-item img': {
          width: '100%'
        }
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
      disableElevation: true
    }
  }
});

export default theme;
