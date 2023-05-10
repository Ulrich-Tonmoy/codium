import { nanoid } from "nanoid";
import { useState, MouseEvent } from "react";
import { readDirectory, writeFile } from "../helpers/fileSys";
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
      setFilename("");
      return;
    }
    if (key !== "Enter") return;

    const filePath = `${file.path}/${filename}`;

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
  };

  return (
    <div className="source-item">
      <div
        className={`source-folder ${
          active ? "bg-gray-200" : ""
        } flex items-center gap-2 px-2 py-0.5 text-gray-500 hover:text-gray-300 cursor-pointer`}
      >
        <i className="text-yellow-500 ri-folder-fill"></i>
        <div className="flex items-center justify-between w-full source-header group">
          <span onClick={onShow}>{file.name}</span>
          <i
            onClick={() => setNewFile(true)}
            className="invisible ri-add-line group-hover:visible"
          ></i>
        </div>
      </div>
      {/* TODO: Input should be auto focused*/}
      {newFile ? (
        <div className="mx-4 flex items-center gap-0.5 p-2">
          <i className="text-gray-300 ri-file-edit-line"></i>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            onKeyUp={(e) => onEnter(e.key)}
            className="input"
          />
        </div>
      ) : null}
      {/* TODO: Add new Folder */}
      <NavFiles visible={unFold} files={files} />
    </div>
  );
};

export default NavFolderItem;
