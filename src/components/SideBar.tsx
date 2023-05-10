import { useState } from "react";
import { IFile } from "../types/index";
import { open } from "@tauri-apps/api/dialog";
import NavFiles from "./NavFiles";
// import { readDirectory } from "../helpers/fileSys";

const SideBar = () => {
  const [projectName, setProjectName] = useState("");
  const [files, setFile] = useState < IFile[] > ([]);

  const loadFile = async () => {
    const selected = await open({
      directory: true,
    });

    if (!selected) return;
    setProjectName(selected as string);
    // readDirectory(selected + "/").then((files) => {
    //   setFiles(files);
    // });
  };

  return (
    <aside id="sidebar" className="h-full w-60 shrink-0 bg-darken">
      <div className="sidebar-header flex items-center justify-between p-4 py-2.5">
        <button className="project-explorer" onClick={loadFile}>
          Explorer
        </button>
        <span className="text-xs text-gray-400 project-name whitespace-nowrap">
          {projectName}
        </span>
        <div className="code-structure">
          <NavFiles visible={true} files={files} />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
