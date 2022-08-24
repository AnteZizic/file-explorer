import React from "react";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { useStyles } from "./styles";
import { INode } from "./types";
import { files } from "./helpers";
import {Typography} from "@material-ui/core";

export const FileTreeView = () => {
  const classes = useStyles();

  const renderTree = (nodes: INode) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      classes={{
        selected: classes.selected,
      }}
      label={
        <div className={classes.labelRoot}>
          {Array.isArray(nodes.children) && <FolderOutlinedIcon color="inherit" className={classes.labelIcon} />}
          <Typography variant="body2" className={classes.labelText}>
            {nodes.name}
          </Typography>
          {nodes.id === 'root' && <MoreVertIcon color="inherit" className={classes.labelIcon} />}
        </div>
      }>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(files)}
    </TreeView>
  );
}