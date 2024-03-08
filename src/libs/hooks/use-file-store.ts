import { IFile } from "@/libs";

interface IEntries {
  [key: string]: IFile;
}

const entries: IEntries = {};

export const loadFileObject = (files: IFile[]): void => {
  files.forEach((file) => {
    entries[file.path] = file;
  });
};

export const saveFileObject = (file: IFile): void => {
  entries[file.path] = file;
};

export const deleteFileObject = (path: string): void => {
  delete entries[path];
};

export const getFileObject = (path: string, currentFile: IFile | null = null): IFile => {
  if (currentFile === null) {
    for (const key of Object.keys(entries)) {
      const file = entries[key];
      if (file.path === path) {
        return file;
      }
      if (file.children) {
        const result = getFileObject(path, file);
        if (result) {
          return result;
        }
      }
    }
  } else {
    if (currentFile.children) {
      for (const child of currentFile.children) {
        if (child.path === path) {
          return child;
        }
        const result = getFileObject(path, child);
        if (result) {
          return result;
        }
      }
    }
  }
  return entries[path];
};
