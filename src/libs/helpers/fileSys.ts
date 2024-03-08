import { FileSysError, IFile, loadFileObject } from "@/libs";
import {
  createDir,
  readDir,
  readTextFile,
  removeDir,
  removeFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { ask } from "@tauri-apps/api/dialog";
import { basename } from "@tauri-apps/api/path";

export const readFile = async (filePath: string): Promise<string> => {
  const contents = await readTextFile(filePath);
  return contents;
};

export const writeFile = async (filePath: string, content: string): Promise<string> => {
  await writeTextFile(filePath, content);
  return FileSysError.OK;
};

export const createFolder = async (folderPath: string): Promise<string> => {
  await createDir(folderPath, { recursive: true });
  return FileSysError.OK;
};

export const deleteFolder = async (dirPath: string): Promise<string> => {
  const folderName = await basename(dirPath);

  const confirmed = await ask(
    `Are you sure you want to delete folder name '${folderName}'?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete folder name '${folderName}'?`,
      type: "warning",
    },
  );

  if (!confirmed) return FileSysError.CANCEL;
  await removeDir(dirPath, { recursive: true });
  return FileSysError.OK;
};

export const deleteFile = async (filePath: string): Promise<string> => {
  const fileName = await basename(filePath);

  const confirmed = await ask(
    `Are you sure you want to delete '${fileName}'?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete '${fileName}'?`,
      type: "warning",
    },
  );

  if (!confirmed) return FileSysError.CANCEL;
  await removeFile(filePath);
  return FileSysError.OK;
};

export const readDirectory = async (folderPath: string): Promise<IFile[]> => {
  const fileTree = await readDir(folderPath, { recursive: true });
  const customSort = (a: any, b: any) => {
    if (a.children && !b.children) return -1;
    if (!a.children && b.children) return 1;
    return a.name.localeCompare(b.name);
  };

  const sortFileTree = (tree: any) => {
    tree.forEach((node: any) => {
      if (node.children) {
        node.children = sortFileTree(node.children);
      }
    });
    return tree.sort(customSort);
  };
  const sortedFileTree = sortFileTree(fileTree);
  loadFileObject(sortedFileTree);

  return sortedFileTree;
};
