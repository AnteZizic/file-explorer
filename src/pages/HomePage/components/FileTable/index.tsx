import React, { ChangeEvent, useMemo, useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  TableContainer,
  Table,
  TableBody,
} from "@material-ui/core";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import moment from "moment";

import { FileTableToolbar } from "../FileTableToolbar";
import { TableHead } from "./TableHead";

import { FileTableProps } from "./types";
import { DISPLAY_MODE } from "../FileTableToolbar/types";
import {getChildsById, getComparator, stableSort} from "./helpers";
import { useStyles } from "./styles";
import { useDataContext } from "../../../../contexts/DataContext";
import {TableRowActions} from "./TableRowActions";

export const FileTable = (props: FileTableProps) => {
  const { parentNodeId } = props;
  const classes = useStyles();

  const [filter, setFilter] = useState('');
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.LIST);
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState<string[]>([]);

  const { data, uploadFile } = useDataContext();

  const folderData = useMemo(() => getChildsById(data, parentNodeId) || [], [data, parentNodeId]);

  const rows = useMemo(() => {
    const filteredData = folderData.filter(({name, description = '', version = '', markup = '', size = '', lastUpdatedAt = new Date()}) => (
      name.toLowerCase().includes(filter.toLowerCase()) ||
      description.toLowerCase().includes(filter.toLowerCase()) ||
      version.toLowerCase().includes(filter.toLowerCase()) ||
      markup.toLowerCase().includes(filter.toLowerCase()) ||
      `${size}`.includes(filter) ||
      moment(lastUpdatedAt).format('MMM D, YYYY').toLowerCase().includes(filter.toLowerCase())
    ));

    return stableSort(filter !== undefined ? filteredData : folderData, getComparator(order, orderBy));
  }, [order, orderBy, folderData, filter]);

  const handleRequestSort = (event: MouseEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Box flex={1} pt={2.3}>
      <FileTableToolbar
        search={filter}
        onChangeSearch={setFilter}
        displayMode={displayMode}
        onUploadFile={handleUploadFile}
        onChangeDisplayMode={setDisplayMode} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <TableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
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
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <Box display="flex" alignItems="center">
                        {Array.isArray(row.children) && <FolderOutlinedIcon className={classes.folderIcon} />}
                        {row.name}
                      </Box>
                    </TableCell>
                    <TableCell>{row.description || '--'}</TableCell>
                    <TableCell>{row.version || '--'}</TableCell>
                    <TableCell><SyncAltIcon /></TableCell>
                    <TableCell>{row.markup || '--'}</TableCell>
                    <TableCell>{row.size || '--'}</TableCell>
                    <TableCell>{moment(row.lastUpdatedAt || new Date()).format('MMM D, YYYY')}</TableCell>
                    <TableCell>
                      <TableRowActions url={row.url} />
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