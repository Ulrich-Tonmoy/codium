import { load } from "@tauri-apps/plugin-store";
import {
  mkdir,
  exists,
  readDir,
  readTextFile,
  remove,
  writeTextFile,
  create,
} from "@tauri-apps/plugin-fs";
import { ask } from "@tauri-apps/plugin-dialog";
import { basename } from "@tauri-apps/api/path";
import { path } from "@tauri-apps/api";
import {
  EDITOR_CONFIG_FILE_NAME,
  IGNORE_FROM_TREE,
  LAST_OPENED_FOLDER_STORE_NAME,
} from "../types/constant";
import { open } from "@tauri-apps/plugin-dialog";
import { IFolderStructure, TFolderTree } from "../types/types";
import { FileSysRes } from "../types/enum";

// Main
export const readFile = async (filePath: string): Promise<FileSysRes.ERROR | string> => {
  const fileExist = await exists(filePath);
  if (!fileExist) {
    return FileSysRes.ERROR;
  }

  const contents = await readTextFile(filePath);
  return contents;
};

export const createFile = async (fullPath: string): Promise<FileSysRes> => {
  const dirPath = fullPath.substring(0, fullPath.lastIndexOf("/"));
  const folderExist = await exists(dirPath);
  if (!folderExist) {
    await createFolder(dirPath);
  }

  const file = await create(fullPath.replace(/\s|\n/g, ""));
  await file.close();

  return FileSysRes.OK;
};

export const writeFile = async (
  filePath: string,
  content: string,
): Promise<FileSysRes> => {
  const folderExist = await exists(filePath);
  if (!folderExist) {
    await createFolder(filePath);
  }
  await writeTextFile(filePath, content);
  return FileSysRes.OK;
};

export const deleteFile = async (filePath: string): Promise<FileSysRes> => {
  const fileName = await basename(filePath);

  const confirmed = await ask(
    `Are you sure you want to delete '${fileName}'?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete '${fileName}'?`,
      kind: "warning",
    },
  );

  if (!confirmed) return FileSysRes.CANCEL;
  await remove(filePath);
  return FileSysRes.OK;
};

export const createFolder = async (folderPath: string): Promise<FileSysRes> => {
  await mkdir(folderPath, { recursive: true });
  return FileSysRes.OK;
};

export const deleteFolder = async (dirPath: string): Promise<FileSysRes> => {
  const folderName = await basename(dirPath);

  const confirmed = await ask(
    `Are you sure you want to delete folder name '${folderName}'?\nThis action cannot be reverted.`,
    {
      title: `Are you sure you want to delete folder name '${folderName}'?`,
      kind: "warning",
    },
  );

  if (!confirmed) return FileSysRes.CANCEL;
  await remove(dirPath, { recursive: true });
  return FileSysRes.OK;
};

export const replaceBackslashes = (input: string) => {
  return input.replace(/\\/g, "/");
};

export const readDirectory = async (
  folderPath: string,
  recursive: boolean = false,
  toIgnore: Array<string> = [],
): Promise<IFolderStructure> => {
  const traverseDirectory = async (currentPath: string): Promise<TFolderTree[]> => {
    const entries = await readDir(currentPath);

    if (!recursive)
      return entries
        .filter((entry) => !toIgnore.includes(entry.name))
        .map((entry) => ({
          ...entry,
          path: currentPath,
          children: [],
        }));

    const tree: TFolderTree[] = [];
    for (const entry of entries) {
      const fullPath = await path.join(currentPath, entry.name);
      const shouldIgnore = toIgnore.includes(entry.name);

      if (!shouldIgnore) {
        if (entry.isDirectory) {
          const subTree = await traverseDirectory(fullPath);

          tree.push({ ...entry, path: replaceBackslashes(fullPath), children: subTree });
        } else {
          tree.push({ ...entry, path: replaceBackslashes(fullPath), children: [] });
        }
      }
    }
    return tree;
  };

  const tree = await traverseDirectory(folderPath);
  const folderName = await basename(folderPath);

  const structure: IFolderStructure = {
    name: folderName,
    root: folderPath,
    tree,
  };

  return structure;
};

// Additional

export const getFolderTree = async () => {
  const store = await load(EDITOR_CONFIG_FILE_NAME, { autoSave: false });

  const folderPath = await open({ directory: true });
  if (!folderPath) return { name: "", root: "", tree: [] };

  const folderTree = await readDirectory(folderPath, true, IGNORE_FROM_TREE);
  store.set(LAST_OPENED_FOLDER_STORE_NAME, folderTree.root);
  store.save();

  return folderTree;
};

export const getFolderTreeOfLastOpenedFolders = async () => {
  const store = await load("codium.json", { autoSave: false });
  const folderPath = await store.get<string>(LAST_OPENED_FOLDER_STORE_NAME);

  if (!folderPath) return { name: "", root: "", tree: [] };

  const folderTree = await readDirectory(folderPath, true, IGNORE_FROM_TREE);
  return folderTree;
};

export const getFileContent = async (path: string) => {
  const content = await readFile(path);
  if (content === FileSysRes.ERROR) return "";
  return content;
};
