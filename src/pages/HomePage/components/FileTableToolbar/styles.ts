import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  exportBtn: {
    textTransform: 'capitalize',
    marginRight: theme.spacing(2),
  },
  searchInput: {
    width: 200,
    marginRight: theme.spacing(2),
  },
  fileInput: {
    display: 'none',
  },
}));