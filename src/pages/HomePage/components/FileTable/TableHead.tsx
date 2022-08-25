import React from "react";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import {
  Checkbox,
  TableCell,
  TableHead as MatTableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";

import { headCells } from "./helpers";
import { TableHeadProps } from "./types";

export const TableHead = (props: TableHeadProps) => {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <MatTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={index === 0 ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                // @ts-ignore
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell><SettingsOutlinedIcon /></TableCell>
      </TableRow>
    </MatTableHead>
  );
}