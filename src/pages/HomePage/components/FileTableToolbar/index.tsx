import React, { ChangeEvent, useRef } from "react";
import { Box, Button } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import CreateFolderIcon from "@material-ui/icons/CreateNewFolderOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import RenameIcon from "@material-ui/icons/ChangeHistoryOutlined";

import { useDataContext } from "../../../../contexts/DataContext";

import { FileTableToolbarProps } from "./types";
import { useStyles } from "./styles";

export const FileTableToolbar = (props: FileTableToolbarProps) => {
  const { onUploadFile, openModal, selected, onChangeSelected } = props;
  const { deleteFile, deleteFolder } = useDataContext();
  const classes = useStyles();

  const fileInputRef = useRef(null);

  const handleClickUpload = () => {
    if (fileInputRef.current !== null) {
      // @ts-ignore
      fileInputRef.current.click();
    }
  };

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      onUploadFile(event.target.files[0]);
    }
  }

  const handleDelete = () => {
    if (selected.length === 1) {
      if (selected[0].includes('.')) {
        deleteFile(selected[0]);
      } else {
        deleteFolder(selected[0]);
      }
      onChangeSelected([]);
    } else {
      alert('You can select only one object!');
    }
  }

  const handleRename = () => {
    if (selected.length === 1) {
      openModal('Rename', selected[0]);
      onChangeSelected([]);
    } else {
      alert('You can select only one object!');
    }
  }

  const createFolderButton = (
    <Button
      variant="outlined"
      color="default"
      className={classes.exportBtn}
      startIcon={<CreateFolderIcon />}
      onClick={() => openModal('Create')}
    >
      Create Folder
    </Button>
  );

  const deleteButton = (
    <Button
      variant="outlined"
      color="default"
      className={classes.exportBtn}
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );

  const renameButton = (
    <Button
      variant="outlined"
      color="default"
      className={classes.exportBtn}
      startIcon={<RenameIcon />}
      onClick={handleRename}
    >
      Rename
    </Button>
  );

  const exportButton = (
    <Button
      variant="outlined"
      color="default"
      className={classes.exportBtn}
      startIcon={<LaunchIcon />}
      onClick={handleClickUpload}
    >
      Upload
    </Button>
  );

  return (
    <Box display="flex" justifyContent="flex-end" height={36} mb={2}>
      {createFolderButton}
      {deleteButton}
      {renameButton}
      {exportButton}
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
        onChange={handleUploadFile}
        accept=".jpeg, .png, .pdf" />
    </Box>
  );
}
