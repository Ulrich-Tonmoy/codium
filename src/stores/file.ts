import { IFile } from "../types";

interface IEntries {
  [key: string]: IFile;
}

const entries: IEntries = {};

export const saveFileObject = (id: string, file: IFile): void => {
  entries[id] = file;
};

export const deleteFileObject = (id: string): void => {
  delete entries[id];
};

export const getFileObject = (id: string): IFile => {
  return entries[id];
};
