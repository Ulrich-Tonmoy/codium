import NavFiles from "./NavFiles";
import { useSelector, useDispatch } from "react-redux";
import ContextMenu from "./ContextMenu";
import { moreMenu } from "../assets";
import { readDirectory } from "../helpers/fileSys";
import { open } from "@tauri-apps/api/dialog";
import { setFiles, updateProjectName } from "../redux/sourceSlice";

const Explorer = () => {
  const dispatch = useDispatch();
  const { files, projectName } = useSelector(
    (state: RootState) => state.source,
  );

  const loadFile = async () => {
    const selected = await open({
      directory: true,
    });
    if (!selected) return;
    dispatch(updateProjectName(selected as string));
    readDirectory(selected + "/").then((files) => {
      dispatch(setFiles(files));
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
          <div className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-fit dark:bg-gray-700 dark:divide-gray-600 fixed hidden group-hover:block">
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
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-sm p-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-4/5"
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
