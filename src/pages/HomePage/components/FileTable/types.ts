import * as React from "react";
import { INode } from "../../../../contexts/types";

export interface TableHeadProps {
  classes: object;
  onSelectAllClick(event: React.ChangeEvent<HTMLInputElement>): void;
  order: 'asc' | 'desc';
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort(event: MouseEvent, property: string): void;
}

export interface FileTableProps {
  parentNodeId: string;
}

export interface TableRowActionsProps {
  url?: string;
}