import { useSource } from "../context/SourceContext";

const ContextMenu = () => {
  const { contextMenu, setContextMenu } = useSource();

  window.addEventListener("click", () => {
    setContextMenu("");
  });

  return (
    <div
      id="context-menu"
      className={`fixed z-50 w-32 bg-black transform origin-top-left ${
        contextMenu
          ? "scale-1 transition-all duration-200 ease-in-out"
          : "scale-0"
      }`}
    >
      {contextMenu === "Folder" && (
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
      <div className="p-1 text-sm text-gray-300 cursor-pointer hover:bg-gray-700">
        <i className="inline-block mr-1 ri-delete-bin-7-line"></i> Delete
      </div>
    </div>
  );
};

export default ContextMenu;
