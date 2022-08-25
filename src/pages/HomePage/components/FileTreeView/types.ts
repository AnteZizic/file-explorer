import {Dispatch, SetStateAction} from "react";

export interface FileTreeViewProps {
  onSelect: Dispatch<SetStateAction<string | undefined>>;
}