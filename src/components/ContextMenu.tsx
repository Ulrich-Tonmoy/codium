import { useSelector, useDispatch } from "react-redux";
import { deleteFile, deleteFolder } from "../helpers/fileSys";
import { deleteFileObject } from "../stores/file";
import { ask } from "@tauri-apps/api/dialog";
import { IFile } from "../types";
import { setContextMenu, setFiles } from "../redux/sourceSlice";
import { edit, fileCreate, folderCreate, trash } from "../assets";

const ContextMenu = () => {
  const dispatch = useDispatch();
  const { files, contextMenu } = useSelector(
    (state: RootState) => state.source,
  );

  window.addEventListener("click", () => {
    dispatch(setContextMenu({} as IFile));
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
          const newFiles = files.filter((f) => f.id !== contextMenu.id);
          dispatch(setFiles(newFiles));
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
          const newFiles = files.filter((f) => f.id !== contextMenu.id);
          console.log(contextMenu.id);
          console.log(files);
          console.log(newFiles);
          dispatch(setFiles(newFiles));
        });
      }
    }
  };

  return (
    <div
      id="context-menu"
      className={`fixed z-50 w-32 bg-black transform origin-top-left ${
        contextMenu?.id
          ? "scale-1 transition-all duration-200 ease-in-out"
          : "scale-0"
      }`}
    >
      {contextMenu.kind === "directory" && (
        <>
          <div className="flex content-center p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700">
            <img
              className="inline-block w-4 mr-2"
              src={fileCreate}
              alt="New File"
            />
            New File
          </div>
          <div className="flex content-center p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700">
            <img
              className="inline-block w-4 mr-2"
              src={folderCreate}
              alt="New Folder"
            />
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
