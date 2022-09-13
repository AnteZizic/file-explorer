import React from "react";
import {
  Tab as MatTab,
  TabProps,
  withStyles,
  Theme,
} from "@material-ui/core";

const styles = (theme: Theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 60,
    minHeight: 36,
    padding: theme.spacing(0.5),
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(4),
  },
  selected: {},
})

// @ts-ignore
export const Tab = withStyles(styles)((props: TabProps) => <MatTab disableRipple {...props} />);