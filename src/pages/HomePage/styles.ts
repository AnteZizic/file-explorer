import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
      padding: '4px 8px',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      textAlign: 'center',
      color: 'black'
    },
    tabs: {
      borderColor: '#e8e8e8',
      borderWidth: 0,
      borderBottomWidth: 1.5,
      minHeight: 36,
      borderStyle: 'solid',
      '& .MuiTabs-indicator': {
        height: 2.5,
      }
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: 400
    }
  })
);
