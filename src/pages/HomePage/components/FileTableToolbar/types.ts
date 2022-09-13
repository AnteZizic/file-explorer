export interface FileTableToolbarProps {
  onUploadFile(file: File): void;
  openModal: (type: string, oldName?: string) => void;
  selected: string[];
  onChangeSelected: (val: string[]) => void;
}
