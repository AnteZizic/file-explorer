import React, {ChangeEvent, useRef} from "react";
import {
  Box,
  Button,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import {
  ToggleButtonGroup,
  ToggleButton,
} from "@material-ui/lab";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import LaunchIcon from "@material-ui/icons/Launch";
import ReorderIcon from "@material-ui/icons/Reorder";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";

import { DISPLAY_MODE, FileTableToolbarProps } from "./types";
import { useStyles } from "./styles";

export const FileTableToolbar = (props: FileTableToolbarProps) => {
  const { search, onChangeSearch, displayMode, onChangeDisplayMode, onUploadFile } = props;
  const classes = useStyles();

  const fileInputRef = useRef(null);

  const handleChangeSearch = (event: any) => {
    onChangeSearch(event.target.value);
  };

  const handleChangeDisplayMode = (event: any, value: DISPLAY_MODE) => {
    onChangeDisplayMode(value);
  };

  const handleClickExport = () => {
    if (fileInputRef.current !== null) {
      // @ts-ignore
      fileInputRef.current.click();
    }
  };

  const handleExportFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      onUploadFile(event.target.files[0]);
    }
  }

  const exportButton = (
    <Button
      variant="outlined"
      color="default"
      className={classes.exportBtn}
      startIcon={<LaunchIcon />}
      endIcon={<KeyboardArrowDownIcon />}
      onClick={handleClickExport}
    >
      Export
    </Button>
  );

  const searchInput = (
    <OutlinedInput
      id="search-input"
      className={classes.searchInput}
      type="text"
      value={search}
      onChange={handleChangeSearch}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      placeholder="Search and filter"
    />
  );

  const displayToggle = (
    <ToggleButtonGroup size="small" value={displayMode} exclusive onChange={handleChangeDisplayMode}>
      <ToggleButton value={DISPLAY_MODE.GRID}>
        <AppsOutlinedIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value={DISPLAY_MODE.LIST}>
        <ReorderIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  )

  return (
    <Box display="flex" justifyContent="flex-end" height={36} mb={2}>
      {exportButton}
      {searchInput}
      {displayToggle}
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
        onChange={handleExportFile}
        accept=".jpeg, .png, .pdf" />
    </Box>
  );
}