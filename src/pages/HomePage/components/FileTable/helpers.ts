import { INode } from "../../../../contexts/types";

export const getChildsById = (data: INode, parentNodeId: string): INode[] | undefined => {
  if (data.id === parentNodeId) {
    return data.children;
  }
  return (data.children || []).map((row) => getChildsById(row, parentNodeId)).filter((row) => row !== undefined)[0];
}

export const getFullPath = (data: INode, folderId: string, path: string): string | undefined => {
  if (data.id === folderId) {
    return path;
  }
  return (data.children || []).filter(row => !row.url).map(row => getFullPath(row, folderId, path + '/' + row.id)).filter(row => row !== undefined)[0];
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
