import React, { ReactNode } from "react";
import {
  Box
} from "@material-ui/core";

export interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;

  [key: string]: any;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  );
}