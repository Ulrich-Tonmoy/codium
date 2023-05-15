import { useSource } from "../context/SourceContext";
import { deleteFile, deleteFolder } from "../helpers/fileSys";
import { deleteFileObject } from "../stores/file";
import { ask } from "@tauri-apps/api/dialog";

const ContextMenu = () => {
  const { contextMenu, setContextMenu, files, setFiles } = useSource();

  window.addEventListener("click", () => {
    setContextMenu({});
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
          const newFiles = files.filter((f) => f.id !== contextMenu.id);
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
        contextMenu?.id
          ? "scale-1 transition-all duration-200 ease-in-out"
          : "scale-0"
      }`}
    >
      {contextMenu.kind === "directory" && (
        <>
          <div className="p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700">
            <i className="inline-block mr-1 ri-file-add-line"></i> New File
          </div>
          <div className="p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700">
            <i className="inline-block mr-1 ri-folder-add-line"></i> New Folder
          </div>
          <hr className="my-0.5 border border-gray-700" />
        </>
      )}
      <div className="p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700">
        <i className="inline-block mr-1 ri-edit-box-line"></i> Rename
      </div>
      <div
        className="p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700"
        onClick={onDelete}
      >
        <i className="inline-block mr-1 ri-delete-bin-7-line"></i> Delete
      </div>
    </div>
  );
};

export default ContextMenu;
