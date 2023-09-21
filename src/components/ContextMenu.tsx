import { deleteFile, deleteFolder } from "../lib/helpers/fileSys";
import { deleteFileObject } from "../lib/hooks/use-file-store";
import { ask } from "@tauri-apps/api/dialog";
import { IFile } from "../lib/types";
import { edit, fileCreate, folderCreate, trash } from "../assets";
import useExplorer from "../lib/hooks/use-explorer-store";

const ContextMenu = () => {
  const { files, setFiles, contextMenu, setContextMenu } = useExplorer();

  window.addEventListener("click", () => {
    setContextMenu({} as IFile);
  });

  const onDelete = async () => {
    if (contextMenu.kind === "file") {
      const isDeleteConfirm = await ask(
        `Are you sure you want to delete '${contextMenu.name}'?`,
        "Codium",
      );
      if (isDeleteConfirm) {
        deleteFile(contextMenu.path).then(() => {
          deleteFileObject(contextMenu.id);
          const newFiles = files.filter((f: any) => f.id !== contextMenu.id);
          setFiles(newFiles);
        });
      }
    } else {
      const isDeleteConfirm = await ask(
        `Are you sure you want to delete '${contextMenu.name}' and its content?`,
        "Codium",
      );
      if (isDeleteConfirm) {
        deleteFolder(contextMenu.path).then(() => {
          deleteFileObject(contextMenu.id);
          const newFiles = files.filter((f: any) => f.id !== contextMenu.id);
          console.log(contextMenu.id);
          console.log(files);
          console.log(newFiles);
          setFiles(newFiles);
        });
      }
    }
  };

  return (
    <div
      id="context-menu"
      className={`fixed z-50 w-32 bg-black transform origin-top-left ${
        contextMenu?.id ? "scale-1 transition-all duration-200 ease-in-out" : "scale-0"
      }`}
    >
      {contextMenu.kind === "directory" && (
        <>
          <div className="flex content-center p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700">
            <img className="inline-block w-4 mr-2" src={fileCreate} alt="New File" />
            New File
          </div>
          <div className="flex content-center p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700">
            <img className="inline-block w-4 mr-2" src={folderCreate} alt="New Folder" />
            New Folder
          </div>
          <hr className="my-0.5 border border-gray-700" />
        </>
      )}
      <div className="flex content-center p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700">
        <img className="inline-block w-4 mr-2" src={edit} alt="Rename" /> Rename
      </div>
      <div
        className="flex content-center p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700"
        onClick={onDelete}
      >
        <img className="inline-block w-4 mr-2" src={trash} alt="Delete" />
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;
