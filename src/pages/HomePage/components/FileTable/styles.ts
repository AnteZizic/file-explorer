import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  folderIcon: {
    marginRight: theme.spacing(0.5),
  },
  actionPopper: {
    backgroundColor: '#f6f6f6',
  },
  fileName: {
    cursor: "pointer"
  }
}));
