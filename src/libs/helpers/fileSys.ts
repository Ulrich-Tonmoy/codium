import { FileSysError, IFile, loadFileObject } from "@/libs";
import {
  mkdir,
  readDir,
  readTextFile,
  remove,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { ask } from "@tauri-apps/plugin-dialog";
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
  await mkdir(folderPath, { recursive: true });
  return FileSysError.OK;
};

export const deleteFolder = async (dirPath: string): Promise<string> => {
  const folderName = await basename(dirPath);

  const confirmed = await ask(
    `Are you sure you want to delete folder name '${folderName}'?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete folder name '${folderName}'?`,
      kind: "warning",
    },
  );

  if (!confirmed) return FileSysError.CANCEL;
  await remove(dirPath, { recursive: true });
  return FileSysError.OK;
};

export const deleteFile = async (filePath: string): Promise<string> => {
  const fileName = await basename(filePath);

  const confirmed = await ask(
    `Are you sure you want to delete '${fileName}'?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete '${fileName}'?`,
      kind: "warning",
    },
  );

  if (!confirmed) return FileSysError.CANCEL;
  await remove(filePath);
  return FileSysError.OK;
};

export const readDirectory = async (folderPath: string): Promise<IFile[]> => {
  const fileTree = await readDir(folderPath);
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
