import * as React from "react";
import { Dispatch, SetStateAction } from "react";

export interface TableHeadProps {
  onSelectAllClick(event: React.ChangeEvent<HTMLInputElement>): void;
  numSelected: number;
  rowCount: number;
}

export interface FileTableProps {
  parentNodeId: string;
  onSelect: Dispatch<SetStateAction<string | undefined>>;
  openModal: (type: string, oldName?: string) => void;
}

export interface TableRowActionsProps {
  url?: string;
}
