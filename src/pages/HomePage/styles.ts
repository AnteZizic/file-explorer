import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '30px auto',
    },
    title: {
      textAlign: 'center',
      color: 'black'
    },
  })
);