import {Dispatch, SetStateAction} from "react";

export enum DISPLAY_MODE {
  GRID,
  LIST,
}

export interface FileTableToolbarProps {
  search: string;
  onChangeSearch: Dispatch<SetStateAction<string>>;
  displayMode: DISPLAY_MODE;
  onChangeDisplayMode: Dispatch<SetStateAction<DISPLAY_MODE>>;
  onUploadFile(file: File): void;
}