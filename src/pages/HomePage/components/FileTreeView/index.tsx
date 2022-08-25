import React from "react";
import { Typography } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { useStyles } from "./styles";
import { FileTreeViewProps } from "./types";
import { INode } from "../../../../contexts/types";
import { useDataContext } from "../../../../contexts/DataContext";

export const FileTreeView = (props: FileTreeViewProps) => {
  const { onSelect } = props;
  const classes = useStyles();

  const { data } = useDataContext();

  const handleNodeSelect = (event: React.ChangeEvent<{}>, nodeIds: string) => {
    onSelect(nodeIds);
  }

  const renderTree = (node: INode) => (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      classes={{
        root: classes.itemRoot,
        selected: classes.selected,
      }}
      label={
        <a
          className={classes.labelRoot}
          // TODO: replace after api integration
          href={node.url ? "http://localhost:3000/file" : undefined}
          target="_blank">
          {Array.isArray(node.children) && <FolderOutlinedIcon color="inherit" className={classes.folderIcon} />}
          <Typography variant="body2" className={classes.labelText}>
            {node.name}
          </Typography>
          {node.id === 'root' && <MoreVertIcon color="inherit" className={classes.moreVertIcon} />}
        </a>
      }>
      {Array.isArray(node.children) ? node.children.map((childNode) => renderTree(childNode)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon className={classes.chevronIcon} />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon className={classes.chevronIcon} />}
      onNodeSelect={handleNodeSelect}
    >
      {renderTree(data)}
    </TreeView>
  );
}