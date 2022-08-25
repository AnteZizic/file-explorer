import React, {useMemo, useRef} from "react";
import {
  Button,
  IconButton,
  Popper,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { useStyles } from "./styles";
import { TableRowActionsProps } from "./types";

export const TableRowActions = (props: TableRowActionsProps) => {
  const { url } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const linkRef = useRef(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  const canDownload = useMemo(() => !!url, [url]);

  const handleClick = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleDownload = () => {
    if (linkRef.current !== null) {
      // @ts-ignore
      linkRef.current.click();
    }
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton aria-describedby={id} aria-label="more" size="small" onClick={handleClick}>
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className={classes.actionPopper}>
          {canDownload && <Button onClick={handleDownload}>Download</Button>}
        </div>
      </Popper>
      <a ref={linkRef} href={url} download />
    </div>
  )
}