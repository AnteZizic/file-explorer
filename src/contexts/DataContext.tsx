import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
} from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
import { _Object } from "@aws-sdk/client-s3";
import { listAllObjects } from "../lib/aws";
import { BucketName, files, SESConfig } from './helpers';
import { INode } from './types';

interface IDataContext {
  data: INode;
  uploadFile(parentNodeId: string, file: File): void;
  downloadFile: (url: string) => void;
  setFolderPath: (val: string) => void;
  createFolder: (folderName: string) => void;
  deleteFile: (fileName: string) => void;
  deleteFolder: (folderName: string) => void;
  renameFile: (fileName: string, newFileName: string) => void;
  renameFolder: (folderName: string, newFolderName: string) => void;
}

type TDataProviderProps = {
  children: React.ReactNode;
}

const initialState: IDataContext = {
  data: files,
  uploadFile: () => {},
  downloadFile: () => {},
  setFolderPath: () => {},
  createFolder: () => {},
  deleteFile: () => {},
  deleteFolder: () => {},
  renameFile: () => {},
  renameFolder: () => {}
};

const BUCKET_NAME = 'trial-ante';

const DataContext = createContext<IDataContext>(initialState);

export const DataProvider: FC<TDataProviderProps> = ({children}) => {
  const [data, setData] = useState<INode>({
    id: 'root',
    name: BUCKET_NAME
  });
  const [updatedFile, setUpdatedFile] = useState<string>('');
  const [folderPath, setFolderPath] = useState<string>('');

  useEffect(() => {
    const getAllObjects = async () => {
      const allObjects = await listAllObjects();
      if (allObjects) {
        const root: INode = {
          id: 'root',
          name: BUCKET_NAME
        };
        if (allObjects.Contents) {
          makeTree(allObjects.Contents, root, 'https://trial-ante.s3.eu-central-1.amazonaws.com/');
        }
        setData(root);
      }
    }

    getAllObjects();
  }, [updatedFile]);

  const makeTree = (data: _Object[], res: INode, url: string) => {
    if (!data.length) return;
    res.children = [];
    data.forEach(object => {
      if (object.Key) {
        const structure = object.Key.split('/');
        if (structure.length === 1) {
          // @ts-ignore
          res.children.push({
            id: object.Key || '',
            name: object.Key || '',
            url: url + (object.Key || ''),
            size: object.Size
          });
        } else if(structure.length === 2) {
          // @ts-ignore
          if (!res.children.find(child => child.name === structure[0])) {
            const newObject: INode = {
              id: structure[0],
              name: structure[0],
            };
            // @ts-ignore
            res.children.push(newObject);
            const folderFiles = data.filter(child => child.Key && child.Key.includes(structure[0] + '/'));
            const newObjectChildren = folderFiles.map(file => ({
              ...file,
              Key: file.Key ? file.Key.slice(structure[0].length + 1) : ''
            }))
            makeTree(newObjectChildren, newObject, url + structure[0] + '/');
          }
        }
      }
    });
  };

  const createFolder = (folderName: string) => {
    const fileName = folderPath === '' ? folderName + '/' : folderPath + '/' + folderName + '/';

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    AWS.config.update(SESConfig);
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    s3.putObject(params, (err) => {
      if(err) {
        alert(err);
      } else{
        alert('created suceessfully');
        setUpdatedFile(folderName);
      }
    });
  };

  const deleteFile = (fileName: string) => {
    const objectName = folderPath !== '' ? folderPath + '/' + fileName : fileName;

    const params = {
      Bucket: BUCKET_NAME,
      Key: objectName
    };

    AWS.config.update(SESConfig);
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    s3.deleteObject(params, (err) => {
      if(err) {
        alert(err);
      } else{
        alert('deleted suceessfully');
        setUpdatedFile(fileName);
      }
    });
  };

  const deleteFolder = (folderName: string) => {
    const objectName = folderPath === '' ? folderName + '/' : folderPath + '/' + folderName + '/';

    const params = {
      Bucket: BUCKET_NAME,
      Prefix: objectName
    };

    AWS.config.update(SESConfig);
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    s3.listObjects(params, (err, sendData) => {
      if(err) {
        alert(err);
      } else{
        if (sendData.Contents && sendData.Contents.length !== 0) {
          let params = {
            Bucket: BUCKET_NAME,
            Delete: {
              Objects: []
            }
          };

          sendData.Contents.forEach((content) => {
            // @ts-ignore
            params.Delete.Objects.push({Key: content.Key});
          });

          s3.deleteObjects(params, function(err) {
            if (err) {
              alert(err);
            } else {
              alert('deleted suceessfully');
              setUpdatedFile(objectName);
            }
          });
        }
      }
    });
  };

  const renameObject = (oldKey: string, newKey: string) => {
    AWS.config.update(SESConfig);
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    s3.copyObject({
      Bucket: BUCKET_NAME,
      CopySource: `${BUCKET_NAME}/${oldKey}`,
      Key: newKey
    }, (err) => {
      if (err) {
        alert(err);
      } else {
        s3.deleteObject({
          Bucket: BUCKET_NAME,
          Key: oldKey
        }, (err) => {
          if(err) {
            alert(err);
          } else{
            alert('renamed suceessfully');
            setUpdatedFile(newKey);
          }
        });
      }
    });
  }

  const renameFile = (fileName: string, newFileName: string) => {
    const objectName = folderPath !== '' ? folderPath + '/' + fileName : fileName;
    const newObjectName = folderPath !== '' ? folderPath + '/' + newFileName : newFileName;

    renameObject(objectName, newObjectName);
  };

  const renameFolder = (folderName: string, newFolderName: string) => {
    const objectName = folderPath !== '' ? folderPath + '/' + folderName : folderName;

    const params = {
      Bucket: BUCKET_NAME,
      Prefix: objectName
    };

    AWS.config.update(SESConfig);
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    s3.listObjects(params, (err, sendData) => {
      if(err) {
        alert(err);
      } else{
        if (sendData.Contents && sendData.Contents.length !== 0) {

          sendData.Contents.forEach(async (content) => {
            if (content.Key) {
              const list = content.Key.split('/');
              const newKey = list.map(li => li === folderName ? newFolderName : li).join('/');
              await renameObject(content.Key, newKey);
            }
          });
        }
      }
    });
  };

  const uploadFile = (parentNodeId: string, file: File) => {
    let fileName = file.name;
    if (folderPath !== '') {
      fileName = folderPath + '/' + fileName;
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: file.type
    };

    AWS.config.update(SESConfig);
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});
    const options = { partSize: 5 * 1024 * 1024, queueSize: 1 };

    s3.upload(params, options, (err) => {
      if(err) {
        alert(err);
      } else{
        alert('uploaded suceessfully');
        setUpdatedFile(file.name);
      }
    });
  };

  const downloadFile = async (url: string) => {
    const res = await axios.get(url, { responseType: 'blob' });
    return res.data;
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
    downloadFile,
    setFolderPath,
    createFolder,
    deleteFile,
    deleteFolder,
    renameFile,
    renameFolder
  };

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};

export const BucketParam = { Bucket: BucketName };

export function useDataContext() {
  return useContext<IDataContext>(DataContext);
}
