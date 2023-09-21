import NavFiles from "./NavFiles";
import ContextMenu from "./ContextMenu";
import { moreMenu } from "../assets";
import { readDirectory } from "../lib/helpers/fileSys";
import { open } from "@tauri-apps/api/dialog";
import useExplorer from "../lib/hooks/use-explorer-store";

const Explorer = () => {
  const { files, setFiles, projectName, updateProjectName } = useExplorer();

  const loadFile = async () => {
    const selected = await open({
      directory: true,
    });
    if (!selected) return;
    updateProjectName(selected as string);
    readDirectory(selected + "/").then((files) => {
      setFiles(files);
    });
  };

  return (
    <>
      <div className="sidebar-header flex items-center justify-between p-2.5">
        <span className="cursor-default project-explorer">
          {" "}
          {projectName
            ? projectName.split("\\")[projectName.split("\\").length - 1]
            : "Explorer"}
        </span>
        <span className="text-xs text-gray-400 cursor-pointer project-name whitespace-nowrap group">
          <img
            className="w-4 hover:bg-gray-500"
            src={moreMenu}
            alt="More Actions"
            title="More Actions"
          />
          <div className="fixed z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-fit dark:bg-gray-700 dark:divide-gray-600 group-hover:block">
            <ul className="py-0.5 text-xs text-gray-700 dark:text-gray-400">
              <li
                className="block px-3 py-2 hover:rounded-lg dark:hover:bg-green-700 dark:hover:text-white"
                onClick={loadFile}
              >
                Open New Folder
              </li>
            </ul>
          </div>
        </span>
      </div>
      {!projectName && (
        <div className="flex flex-col items-center justify-center mt-5">
          <button
            className="w-4/5 p-1 text-sm font-medium text-white bg-green-700 rounded-sm focus:outline-none hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={loadFile}
          >
            Open Folder
          </button>
        </div>
      )}
      <div className="code-structure">
        <NavFiles visible={true} files={files} />
      </div>
      <ContextMenu />
    </>
  );
};

export default Explorer;
