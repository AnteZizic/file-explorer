import React, { ChangeEvent, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@material-ui/core";
import moment from "moment";

import { FileTableToolbar } from "../FileTableToolbar";
import { TableHead } from "./TableHead";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";

import { useDataContext } from "../../../../contexts/DataContext";

import { FileTableProps } from "./types";
import { getChildsById, getFullPath } from "./helpers";
import { useStyles } from "./styles";

export const FileTable = (props: FileTableProps) => {
  const { parentNodeId, onSelect, openModal } = props;
  const classes = useStyles();

  const [selected, setSelected] = React.useState<string[]>([]);

  const { data, downloadFile, uploadFile, setFolderPath } = useDataContext();

  useEffect(() => {
    if (parentNodeId === 'root') {
      setFolderPath('');
      return;
    }
    const path = getFullPath(data, parentNodeId, 'root');
    if (!path) return;
    const list = path.split('/');
    if (list.length > 1) {
      setFolderPath(list.slice(1).join('/'));
    }
  }, [parentNodeId]);

  const rows = useMemo(() => getChildsById(data, parentNodeId) || [], [data, parentNodeId]);

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<HTMLTableRowElement>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleUploadFile = (file: File) => {
    uploadFile(parentNodeId, file);
  };

  const handleDownload = async (url: string) => {
    if (url) {
      const list = url.split('/');
      const fileName = list[list.length - 1];
      const res = await downloadFile(url);
      const fileURL = window.URL.createObjectURL(res);
      const alink = document.createElement('a');
      alink.href = fileURL;
      alink.download = fileName;
      alink.click();
    }
  }

  const handleOpen = (url: string) => {
    if (url) {
      const list = url.split('/');
      if (list.length > 3) {
        const link = document.createElement('a');
        link.style.display = "none";
        link.setAttribute('href', url);
        link.setAttribute('target', '_blank');
        link.click();
      }
    }
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Box flex={1} pt={2.3}>
      <FileTableToolbar
        onUploadFile={handleUploadFile}
        openModal={openModal}
        selected={selected}
        onChangeSelected={setSelected}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <TableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `file-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell id={labelId} scope="row" padding="none">
                      <Box display="flex" alignItems="center">
                        {Array.isArray(row.children) && <FolderOutlinedIcon className={classes.folderIcon} />}
                        {!Array.isArray(row.children) ? (
                          <p className={classes.fileName} onClick={() => handleOpen(row.url || '')}>
                            {row.name}
                          </p>
                        ) : (
                          <p className={classes.fileName} onClick={() => onSelect(row.id)}>
                            {row.name + '/'}
                          </p>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{row.description || '--'}</TableCell>
                    <TableCell>{row.version || '--'}</TableCell>
                    <TableCell><SyncAltIcon /></TableCell>
                    <TableCell>{row.markup || '--'}</TableCell>
                    <TableCell>{row.size || '--'}</TableCell>
                    <TableCell>{moment(row.lastUpdatedAt || new Date()).format('MMM D, YYYY')}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDownload(row.url || '')} disabled={!row.url}>Download</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
