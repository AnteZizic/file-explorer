import React, { useState } from 'react';
import { Box, Button, Modal, Tabs, TextField } from '@material-ui/core';

import { TabPanel } from './components/TabPanel';
import { Tab } from './components/Tab';
import { FileTreeView } from './components/FileTreeView';
import { FileTable } from './components/FileTable';

import { useDataContext } from '../../contexts/DataContext';

import { useStyles } from './styles';

const HomePage = () => {
  const classes = useStyles();

  const [tab, setTab] = useState(0);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('Create');
  const [oldName, setOldName] = useState<string>('');
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const { createFolder, renameFile, renameFolder } = useDataContext();

  const handleChangeTab = (event: any, newValue: number) => {
    setTab(newValue);
  };

  const handleOpen = (type: string, oldName?: string) => {
    setModalType(type);
    setOldName(oldName || '');
    setNewFolderName(oldName || '');
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleCreate = async () => {
    if (newFolderName === '') {
      setError(true);
    } else {
      setError(false);
      handleClose();
      await createFolder(newFolderName);
      setNewFolderName('');
    }
  }

  const handleRename = async () => {
    if (newFolderName === '') {
      setError(true);
    } else {
      setError(false);
      handleClose();
      if (oldName.includes('.')) {
        await renameFile(oldName, newFolderName);
      } else {
        await renameFolder(oldName, newFolderName);
      }
      setOldName('');
      setNewFolderName('');
    }
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const folderName = event.target.value;
    setNewFolderName(folderName);
    if (folderName) setError(false);
  }

  return (
    <Box className={classes.container}>
      <Tabs className={classes.tabs} value={tab} onChange={handleChangeTab} aria-label="Folders tab">
        <Tab label="Folders" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Box display="flex" height="100%">
          <FileTreeView onSelect={setSelectedFolderId} />
          {selectedFolderId !== undefined && (
            <FileTable parentNodeId={selectedFolderId} onSelect={setSelectedFolderId} openModal={handleOpen} />
          )}
          <Modal
            open={isOpen}
            className={classes.modal}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Box className={classes.paper}>
              <Box position="relative" display="flex" justifyContent="space-between" alignItems="end">
                <TextField
                  error={error}
                  id="standard-error-helper-text"
                  label="New Folder Name"
                  value={newFolderName}
                  onChange={handleTextChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={modalType === 'Create' ? handleCreate : handleRename}
                >
                  {modalType}
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default HomePage;
