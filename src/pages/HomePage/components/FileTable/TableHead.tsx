import React from "react";
import {
  Checkbox,
  TableCell,
  TableHead as MatTableHead,
  TableRow,
} from "@material-ui/core";

import { headCells } from "./helpers";
import { TableHeadProps } from "./types";

export const TableHead = (props: TableHeadProps) => {
  const { onSelectAllClick, numSelected, rowCount } = props;

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
          >
            {headCell.label}
          </TableCell>
        ))}
        <TableCell>Download</TableCell>
      </TableRow>
    </MatTableHead>
  );
}
