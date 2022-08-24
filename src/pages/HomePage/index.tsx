import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";

import { TabPanel } from './components/TabPanel';
import { FileTreeView } from "./components/FileTreeView";

import { useStyles } from "./styles";

const HomePage = () => {
  const classes = useStyles();

  const [tab, setTab] = useState(0);

  const handleChangeTab = (event: any, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box className={classes.container}>
      <Tabs value={tab} onChange={handleChangeTab} aria-label="Folders tab">
        <Tab label="Folders" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <FileTreeView />
      </TabPanel>
    </Box>
  );
};

export default HomePage;
