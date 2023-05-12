import { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { useSource } from "../context/SourceContext";

const TitleBar = () => {
  const { projectName } = useSource();
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

  return (
    <div id="titlebar" data-tauri-drag-region>
      <div className="flex items-center gap-1">
        <img
          src="/logo.png"
          alt="codium"
          className="w-5 mr-2 cursor-pointer"
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
      </div>
      <div>
        {projectName ? (
          <span className="flex items-center text-xs text-gray-400 capitalize project-name whitespace-nowrap">
            <i className="mr-2 text-base text-green-500 cursor-pointer ri-search-2-line"></i>
            {projectName.split("\\")[projectName.split("\\").length - 1]} -
            Codium
          </span>
        ) : (
          <span className="flex items-center text-xs text-gray-400 cursor-pointer project-name whitespace-nowrap">
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
