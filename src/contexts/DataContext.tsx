import React, {
  createContext,
  useContext,
  useState,
  FC,
} from 'react';
import { INode } from "./types";

// TODO: replaced with api integration: MOCK Data
import { files } from "./helpers";

interface IDataContext {
  data: INode;
  uploadFile(parentNodeId: string, file: File): void;
}

const initialState: IDataContext = {
  data: files,
  uploadFile: () => {},
};
const DataContext = createContext<IDataContext>(initialState);

export const DataProvider: FC = ({children}: any) => {
  const [data, setData] = useState(initialState.data);

  const uploadFile = (parentNodeId: string, file: File) => {
    // TODO: replace with api integration
    const newNode = {
      id: parentNodeId + file.name + Math.random(),
      name: file.name,
      size: file.size,
      lastUpdatedAt: new Date(),
      url: 'localhost:3000/mock.pdf'
    };

    setData(updatedData(data, parentNodeId, newNode));
  };

  const updatedData = (data: INode, parentNodeId: string, newNode: INode): INode => {
    if (data.id === parentNodeId) {
      return {
        ...data,
        children: [...(data.children || []), newNode]
      };
    } else {
      if (Array.isArray(data.children)) {
        return {
          ...data,
          children: data.children.map((node) => updatedData(node, parentNodeId, newNode))
        };
      } else {
        return data;
      }
    }
  }

  const value: IDataContext = {
    data,
    uploadFile,
  };

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};

export function useDataContext() {
  return useContext<IDataContext>(DataContext);
}
