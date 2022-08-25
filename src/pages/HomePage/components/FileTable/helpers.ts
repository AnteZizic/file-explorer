import { INode } from "../../../../contexts/types";

export const descendingComparator = (a: INode, b: INode, orderBy: string) => {
  // @ts-ignore
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  // @ts-ignore
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const getComparator = (order: 'desc' | 'asc', orderBy: string) => {
  return order === 'desc'
    ? (a: INode, b: INode) => descendingComparator(a, b, orderBy)
    : (a: INode, b: INode) => -descendingComparator(a, b, orderBy);
}

export const stableSort = (array: INode[], comparator: Function): INode[] => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    // @ts-ignore
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]) as INode[];
}

export const getChildsById = (data: INode, parentNodeId: string): INode[] | undefined => {
  if (data.id === parentNodeId) {
    return data.children;
  }
  return (data.children || []).map((row) => getChildsById(row, parentNodeId)).filter((row) => row !== undefined)[0];
}

export const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'version', label: 'Version' },
  { id: 'synced-with-bridge', label: 'Synced with Bridge' },
  { id: 'markup', label: 'Markup' },
  { id: 'size', label: 'Size' },
  { id: 'last-updated', label: 'Last updated' },
];