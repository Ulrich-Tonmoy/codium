import { useState } from "react";
import { NavFiles } from "@/components";
import {
  arrowDown,
  arrowRight,
  edit,
  fileCreate,
  folder,
  folderCreate,
  folderOpen,
} from "@/assets";
import { IFile, saveFileObject, createFolder, writeFile } from "@/libs";

interface Props {
  file: IFile;
  active: boolean;
}

export const NavFolderItem = ({ file, active }: Props) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [unFold, setUnFold] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [newFile, setNewFile] = useState(false);
  const [newFolder, setNewFolder] = useState(false);
  const [filename, setFilename] = useState("");

  const onShow = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (loaded) {
      setUnFold(!unFold);
      return;
    }

    setLoaded(true);
    file.children && setFiles(file.children);
    setUnFold(!unFold);
  };

  const onClickNew = (type: string) => {
    if (type === "File") {
      setNewFolder(false);
      setNewFile(true);
    } else {
      setNewFile(false);
      setNewFolder(true);
    }
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
        const newFile: IFile = {
          name: filename,
          path: filePath,
          children: null,
        };
        saveFileObject(newFile);
        setFiles((prevFiles) => [newFile, ...prevFiles]);
        setNewFile(false);
        setFilename("");
      });
    } else if (newFolder) {
      createFolder(filePath).then(() => {
        const newFolder: IFile = {
          name: filename,
          path: filePath,
          children: null,
        };
        saveFileObject(newFolder);
        setFiles((prevFiles) => [newFolder, ...prevFiles]);
        setNewFolder(false);
        setFilename("");
      });
    }
  };

  window.addEventListener("click", (event) => {
    const el = document.getElementById("new-input");
    if (el)
      if (!el.contains(event.target as Node)) {
        setNewFile(false);
        setNewFolder(false);
      }
  });

  return (
    <div className="source-item">
      <div
        className={`source-folder ${
          active ? "bg-gray-200" : ""
        } flex items-center py-0.5 text-gray-500 hover:text-gray-300 cursor-pointer`}
        onClick={onShow}
      >
        <img className="w-4" src={unFold ? arrowDown : arrowRight} alt="arrow" />
        <img className="w-4" src={unFold ? folderOpen : folder} alt="folder" />
        <div className="flex items-center justify-between w-full ml-1 source-header group">
          {/* @ts-ignore */}
          <span>{file.name}</span>
          <span className="flex items-center">
            <img
              onClick={() => onClickNew("File")}
              className="invisible w-4 mr-1 group-hover:visible hover:bg-gray-500"
              src={fileCreate}
              alt="New File"
            />
            <img
              onClick={() => onClickNew("Folder")}
              className="invisible w-4 group-hover:visible hover:bg-gray-500"
              src={folderCreate}
              alt="New Folder"
            />
          </span>
        </div>
      </div>
      {newFile ? (
        <div id="new-input" className="mx-4 flex items-center gap-0.5 p-2">
          <img className="w-4 text-gray-300 " src={edit} alt="New File" />
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
        <div id="new-input" className="mx-4 flex items-center gap-0.5 p-2">
          <img className="w-4" src={folder} alt="folder" />
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
