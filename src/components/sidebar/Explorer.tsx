import NavFiles from "./NavFiles";
import ContextMenu from "./ContextMenu";
import { moreMenu } from "../../assets";
import { readDirectory } from "../../lib/helpers/fileSys";
import { open } from "@tauri-apps/api/dialog";
import useExplorer from "../../lib/hooks/use-explorer-store";
import { Button } from "../ui/button";

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
    <aside id="sidebar" className="h-full w-60 shrink-0 bg-darken">
      <div className="sidebar-header flex items-center justify-between p-2.5">
        <span className="cursor-default project-explorer">
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
          <div className="fixed z-10 hidden font-normal bg-gray-700 divide-y divide-gray-600 rounded-md shadow w-fit group-hover:block">
            <ul className="py-0.5 text-xs text-gray-700 dark:text-gray-400">
              <li
                className="block px-3 py-2 text-white hover:rounded-md hover:bg-green-700"
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
          <Button onClick={loadFile} variant="primary" className="h-8">
            Open Folder
          </Button>
        </div>
      )}
      <div className="code-structure">
        <NavFiles visible={true} files={files} />
      </div>
      <ContextMenu />
    </aside>
  );
};

export default Explorer;
