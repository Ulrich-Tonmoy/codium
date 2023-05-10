import { invoke } from "@tauri-apps/api/tauri";
import { nanoid } from "nanoid";
import { IFile } from "../types";
import { saveFileObject } from "../stores/file";

export const readFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    invoke("get_file_content", { filePath })
      .then((message: unknown) => {
        resolve(message as string);
      })
      .catch((error) => reject(error));
  });
};

export const writeFile = (
  filePath: string,
  content: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    invoke("write_file", { filePath, content }).then((message: unknown) => {
      if (message === "OK") {
        resolve(message as string);
      } else {
        reject("ERROR");
      }
    });
  });
};

export const readDirectory = (folderPath: string): Promise<IFile[]> => {
  return new Promise((resolve, reject) => {
    invoke("open_folder", { folderPath }).then((message: unknown) => {
      const msg = message as string;
      const files = JSON.parse(msg.replaceAll("\\", "/").replaceAll("//", "/"));
      const entries: IFile[] = [];
      const folders: IFile[] = [];

      if (!files || !files.length) {
        resolve(entries);
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const id = nanoid();
        const entry: IFile = {
          id,
          kind: file.kind,
          name: file.name,
          path: file.path,
        };

        if (file.kind === "file") {
          entries.push(entry);
        } else {
          folders.push(entry);
        }
        saveFileObject(id, entry);
      }
      resolve([...folders, ...entries]);
    });
  });
};
