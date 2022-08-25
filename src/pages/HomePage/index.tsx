import React, { useState } from "react";
import {
  Box,
  Tabs,
} from "@material-ui/core";

import { TabPanel } from "./components/TabPanel";
import { Tab } from "./components/Tab";
import { FileTreeView } from "./components/FileTreeView";
import { FileTable } from "./components/FileTable";

import { useStyles } from "./styles";

const HomePage = () => {
  const classes = useStyles();

  const [tab, setTab] = useState(0);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>();

  const handleChangeTab = (event: any, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box className={classes.container}>
      <Tabs className={classes.tabs} value={tab} onChange={handleChangeTab} aria-label="Folders tab">
        <Tab label="Folders" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Box display="flex" height="100%">
          <FileTreeView onSelect={setSelectedFolderId} />
          {selectedFolderId !== undefined && (
            <FileTable parentNodeId={selectedFolderId} />
          )}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default HomePage;
