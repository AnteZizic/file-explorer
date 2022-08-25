import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 390,
    marginLeft: -17,
    paddingTop: 15,
    borderWidth: 0,
    borderRightWidth: 1.5,
    borderColor: '#e8e8e8',
    borderStyle: 'solid',
  },
  itemRoot: {
    '& .MuiTreeItem-group': {
      marginLeft: 27,
    },
    '& .MuiTreeItem-content': {
      paddingLeft: theme.spacing(1),
      borderLeftWidth: 2,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      height: 38,
    },
    '&.Mui-selected > .MuiTreeItem-content': {
      borderColor: '#696969',
    },
    '&:hover > .MuiTreeItem-content:only-child, &:focus > .MuiTreeItem-content, &.Mui-selected > .MuiTreeItem-content': {
      backgroundColor: '#f6f6f6',
      '& > *': {
        backgroundColor: 'transparent !important',
      }
    },
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
    color: 'inherit',
    textDecoration: 'none',
  },
  folderIcon: {
    marginRight: theme.spacing(1),
  },
  moreVertIcon: {
    marginRight: theme.spacing(0.5),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
  selected: {},
  chevronIcon: {
    width: 30,
    height: 30,
  },
}));