import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useDataContext } from "../../../../contexts/DataContext";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import { FileTreeViewProps } from "./types";
import { INode } from "../../../../contexts/types";
import { truncateText } from "../../../../lib/string";
import { useStyles } from "./styles";

export const FileTreeView = (props: FileTreeViewProps) => {
  const { onSelect } = props;
  const { data } = useDataContext();
  const classes = useStyles();
  const [files, setFiles] = useState<INode>();

  useEffect(() => {
    setFiles(data);
  }, [data]);

  const handleNodeSelect = (event: React.ChangeEvent<{}>, nodeIds: string) => {
    onSelect(nodeIds);
    const list = nodeIds.split('/');
    if (list.length > 3) {
      const link = document.createElement('a');
      link.style.display = "none";
      link.setAttribute('href', nodeIds);
      link.setAttribute('target', '_blank');
      link.click();
    }
  }

  const renderTree = (node: INode) => {
      return (
          <TreeItem
              key={node.url || node.id}
              nodeId={node.url || node.id}
              classes={{
                  root: classes.itemRoot,
                  selected: classes.selected,
              }}
              label={
                  <a
                      className={classes.labelRoot}
                  >
                      {Array.isArray(node.children) && (
                          <FolderOutlinedIcon color="inherit" className={classes.folderIcon} />
                      )}
                      <Typography variant="body2" className={classes.labelText}>
                          {truncateText(node.name || node.id)}
                      </Typography>
                  </a>
              }
          >
              {Array.isArray(node.children)
                  ? node.children.map((childNode: INode) => renderTree(childNode))
                  : null}
          </TreeItem>
      );
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon className={classes.chevronIcon} />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon className={classes.chevronIcon} />}
      onNodeSelect={handleNodeSelect}
    >
      {files ? renderTree(files) : <TreeItem nodeId="loader" label="Fetching..." />}
    </TreeView>
  );
}
