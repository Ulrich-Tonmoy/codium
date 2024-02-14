import { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { close, maximize, minimize, restoreDown } from "@/assets";
import { useExplorer } from "@/libs";

export const TitleBar = () => {
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

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between pl-2 text-text bg-[#1c1c1c]"
      data-tauri-drag-region
    >
      <div className="flex items-center gap-1">
        <img
          src="/logo.png"
          alt="codium"
          className="w-5 mr-2 cursor-default"
          title="Codium"
        />
      </div>
      <div
        className="flex items-center justify-center w-1/3 px-2 text-gray-200 rounded-md shadow-sm outline-none cursor-default sm:text-sm"
        data-tauri-drag-region
      >
        {projectName
          ? `${projectName.split("\\")[projectName.split("\\").length - 1]} - Codium`
          : "Codium"}
      </div>
      <div className="flex items-center">
        <img
          className="px-2 py-1 text-center cursor-pointer w-7 h-7 hover:bg-gray-800"
          src={minimize}
          alt="Minimize"
          title="Minimize"
          onClick={onMinimize}
        />
        {isScaleUp ? (
          <img
            className="px-2 py-1 text-center cursor-pointer w-7 h-7 hover:bg-gray-800"
            src={restoreDown}
            alt="Restore Down"
            title="Restore Down"
            onClick={onScaleDown}
          />
        ) : (
          <img
            className="px-2 py-1 text-center cursor-pointer w-7 h-7 hover:bg-gray-800"
            src={maximize}
            alt="Maximize"
            title="Maximize"
            onClick={onScaleUp}
          />
        )}
        <img
          id="ttb-close"
          className="px-2 py-1 text-center cursor-pointer w-7 h-7 hover:text-gray-800 hover:bg-red-500"
          src={close}
          alt="Close"
          title="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
