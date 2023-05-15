import { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { useSource } from "../context/SourceContext";
import { readDirectory } from "../helpers/fileSys";
import { open } from "@tauri-apps/api/dialog";

const TitleBar = () => {
  const { projectName, updateProjectName, setFiles } = useSource();
  const [isScaleUp, setIsScaleUp] = useState(false);

  const onMinimize = () => appWindow.minimize();
  const onScaleUp = () => {
    appWindow.toggleMaximize();
    setIsScaleUp(true);
  };
  const onScaleDown = () => {
    appWindow.toggleMaximize();
    setIsScaleUp(false);
  };
  const onClose = () => appWindow.close();

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
    <div id="titlebar" data-tauri-drag-region>
      <div className="flex items-center gap-1">
        <img
          src="/logo.png"
          alt="codium"
          className="w-5 mr-2 cursor-default"
          title="Codium"
        />
        <i
          className="text-green-500 cursor-pointer ri-file-3-line"
          title="Explorer"
        ></i>
        <i
          className="text-green-500 cursor-pointer ri-search-line"
          title="Search"
        ></i>
        <i
          className="text-green-500 cursor-pointer ri-terminal-box-fill"
          title="Terminal"
        ></i>
        <i
          className="text-green-500 cursor-pointer ri-git-branch-line"
          title="Source Control"
        ></i>
        <i
          className="text-green-500 cursor-pointer ri-settings-5-line"
          title="Settings"
        ></i>
      </div>
      <div className="flex items-center justify-center w-1/3 px-2 text-gray-200 rounded-md shadow-sm outline-none sm:text-sm bg-primary">
        {projectName ? (
          <span className="flex items-center text-xs text-gray-400 capitalize project-name whitespace-nowrap">
            <i
              className="mr-2 text-base text-green-500 cursor-pointer ri-search-2-line"
              onClick={loadFile}
            ></i>
            {projectName.split("\\")[projectName.split("\\").length - 1]} -
            Codium
          </span>
        ) : (
          <span
            className="flex items-center text-xs text-gray-400 cursor-pointer project-name whitespace-nowrap"
            onClick={loadFile}
          >
            <i className="mr-2 text-base text-green-500 ri-search-2-line"></i>
            Open Project - Codium
          </span>
        )}
      </div>
      <div className="titlebar-actions">
        <i className="titlebar-icon ri-subtract-line" onClick={onMinimize}></i>
        {isScaleUp ? (
          <i
            className="titlebar-icon ri-file-copy-line"
            onClick={onScaleDown}
          ></i>
        ) : (
          <i className="titlebar-icon ri-stop-line" onClick={onScaleUp}></i>
        )}
        <i
          id="ttb-close"
          className="titlebar-icon ri-close-fill"
          onClick={onClose}
        ></i>
      </div>
    </div>
  );
};

export default TitleBar;
