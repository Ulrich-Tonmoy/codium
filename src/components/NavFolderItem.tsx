import { nanoid } from "nanoid";
import { useState, MouseEvent } from "react";
import { createFolder, readDirectory, writeFile } from "../helpers/fileSys";
import { saveFileObject } from "../stores/file";
import { IFile } from "../types";
import NavFiles from "./NavFiles";

interface Props {
  file: IFile;
  active: boolean;
}

const NavFolderItem = ({ file, active }: Props) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [unFold, setUnFold] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [newFile, setNewFile] = useState(false);
  const [newFolder, setNewFolder] = useState(false);
  const [filename, setFilename] = useState("");

  const onShow = async (e: MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();

    if (loaded) {
      setUnFold(!unFold);
      return;
    }

    const entries = await readDirectory(file.path + "/");
    setLoaded(true);
    setFiles(entries);
    setUnFold(!unFold);
  };

  const onEnter = (key: string) => {
    if (key === "Escape") {
      setNewFile(false);
      setNewFolder(false);
      setFilename("");
      return;
    }
    if (key !== "Enter") return;

    const filePath = `${file.path}/${filename}`;

    if (newFile) {
      writeFile(filePath, "").then(() => {
        const id = nanoid();
        const newFile: IFile = {
          id,
          name: filename,
          path: filePath,
          kind: "file",
        };
        saveFileObject(id, newFile);
        setFiles((prevFiles) => [newFile, ...prevFiles]);
        setNewFile(false);
        setFilename("");
      });
    } else if (newFolder) {
      createFolder(filePath).then(() => {
        const id = nanoid();
        const newFolder: IFile = {
          id,
          name: filename,
          path: filePath,
          kind: "directory",
        };
        saveFileObject(id, newFolder);
        setFiles((prevFiles) => [newFolder, ...prevFiles]);
        setNewFolder(false);
        setFilename("");
      });
    }
  };

  return (
    <div className="source-item">
      <div
        className={`source-folder ${
          active ? "bg-gray-200" : ""
        } flex items-center gap-2 px-2 py-0.5 text-gray-500 hover:text-gray-300 cursor-pointer`}
        onClick={onShow}
      >
        <span>
          <i
            class={`${
              unFold ? "ri-arrow-down-s-line" : "ri-arrow-right-s-line"
            }`}
          ></i>
          <i
            className={`text-yellow-500 ${
              unFold ? "ri-folder-open-fill" : "ri-folder-fill"
            }`}
          ></i>
        </span>
        <div className="flex items-center justify-between w-full source-header group">
          {/* @ts-ignore */}
          <span>{file.name}</span>
          <span>
            <i
              onClick={() => setNewFile(true)}
              className="invisible mr-1 ri-add-line group-hover:visible hover:bg-gray-500"
              title="New File"
            ></i>
            <i
              onClick={() => setNewFolder(true)}
              className="invisible ri-folder-add-line group-hover:visible hover:bg-gray-500"
              title="New Folder"
            ></i>
          </span>
        </div>
      </div>
      {newFile ? (
        <div className="mx-4 flex items-center gap-0.5 p-2">
          <i className="text-gray-300 ri-file-edit-line"></i>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            onKeyUp={(e) => onEnter(e.key)}
            className="input"
            autoFocus
          />
        </div>
      ) : null}
      {newFolder ? (
        <div className="mx-4 flex items-center gap-0.5 p-2">
          <i className="text-gray-300 ri-folder-add-line"></i>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            onKeyUp={(e) => onEnter(e.key)}
            className="input"
            autoFocus
          />
        </div>
      ) : null}
      <NavFiles visible={unFold} files={files} />
    </div>
  );
};

export default NavFolderItem;
