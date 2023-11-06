import { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { close, maximize, minimize, restoreDown } from "../assets";
import useExplorer from "../lib/hooks/use-explorer-store";
import useSidebar from "@/lib/hooks/use-sidebar-store";
import { Button } from "./ui/button";
import { File, FolderSearch2, GitBranch, Search, Settings, Terminal } from "lucide-react";

const TitleBar = () => {
  const { activeSidebarName, toggleSidebar } = useSidebar();
  const { projectName } = useExplorer();

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

  const onClickSearch = async () => {};

  return (
    <div id="titlebar" data-tauri-drag-region>
      <div className="flex items-center gap-1">
        <img
          src="/logo.png"
          alt="codium"
          className="w-5 mr-2 cursor-default"
          title="Codium"
        />
        <Button
          variant={activeSidebarName === "Explorer" ? "primary" : "ghost"}
          size="titleIcon"
          title="Explorer"
          onClick={() => toggleSidebar("Explorer")}
        >
          <File className="w-4 h-4" />
        </Button>
        <Button
          variant={activeSidebarName === "Search" ? "primary" : "ghost"}
          size="titleIcon"
          title="Search"
          onClick={() => toggleSidebar("Search")}
        >
          <FolderSearch2 className="w-4 h-4" />
        </Button>
        <Button
          variant={activeSidebarName === "Terminal" ? "primary" : "ghost"}
          size="titleIcon"
          title="Terminal"
          onClick={() => toggleSidebar("Terminal")}
        >
          <Terminal className="w-4 h-4" />
        </Button>
        <Button
          variant={activeSidebarName === "Git" ? "primary" : "ghost"}
          size="titleIcon"
          title="Git"
          onClick={() => toggleSidebar("Git")}
        >
          <GitBranch className="w-4 h-4" />
        </Button>
        <Button
          variant={activeSidebarName === "Settings" ? "primary" : "ghost"}
          size="titleIcon"
          title="Settings"
          onClick={() => toggleSidebar("Settings")}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
      <div
        className="flex items-center justify-center w-1/3 px-2 text-gray-200 rounded-md shadow-sm outline-none cursor-pointer sm:text-sm bg-primary"
        onClick={onClickSearch}
      >
        {projectName ? (
          <span className="flex items-center text-xs text-gray-400 capitalize project-name whitespace-nowrap">
            <Search className="w-4 mr-2" />
            {projectName.split("\\")[projectName.split("\\").length - 1]} - Codium
          </span>
        ) : (
          <span className="flex items-center text-xs text-gray-400 project-name whitespace-nowrap p-0.5">
            <Search className="w-4 mr-2" />
            Codium
          </span>
        )}
      </div>
      <div className="titlebar-actions">
        <img
          className="titlebar-icon"
          src={minimize}
          alt="Minimize"
          title="Minimize"
          onClick={onMinimize}
        />
        {isScaleUp ? (
          <img
            className="titlebar-icon"
            src={restoreDown}
            alt="Restore Down"
            title="Restore Down"
            onClick={onScaleDown}
          />
        ) : (
          <img
            className="titlebar-icon"
            src={maximize}
            alt="Maximize"
            title="Maximize"
            onClick={onScaleUp}
          />
        )}
        <img
          id="ttb-close"
          className="titlebar-icon"
          src={close}
          alt="Close"
          title="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default TitleBar;
