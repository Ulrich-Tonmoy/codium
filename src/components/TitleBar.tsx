import { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { useSelector, useDispatch } from "react-redux";
import {
  close,
  file,
  maximize,
  minimize,
  restoreDown,
  search,
  setting,
  sourceControl,
  terminal,
} from "../assets";

const TitleBar = () => {
  const dispatch = useDispatch();
  const { projectName } = useSelector((state: any) => state.source);

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
        <img
          src={file}
          alt="Explorer"
          className="w-4 cursor-pointer"
          title="Explorer"
        />
        <img
          src={search}
          alt="Search"
          className="w-4 cursor-pointer"
          title="Search"
        />
        <img
          src={terminal}
          alt="Terminal"
          className="w-4 cursor-pointer"
          title="Terminal"
        />
        <img
          src={sourceControl}
          alt="Source Control"
          className="w-4 cursor-pointer"
          title="Source Control"
        />
        <img
          src={setting}
          alt="Settings"
          className="w-4 cursor-pointer"
          title="Settings"
        />
      </div>
      <div
        className="flex items-center justify-center w-1/3 px-2 text-gray-200 rounded-md shadow-sm outline-none sm:text-sm bg-primary cursor-pointer"
        onClick={onClickSearch}
      >
        {projectName ? (
          <span className="flex items-center text-xs text-gray-400 capitalize project-name whitespace-nowrap">
            <img src={search} alt="search" className="w-4 mr-2" />
            {projectName.split("\\")[projectName.split("\\").length - 1]} -
            Codium
          </span>
        ) : (
          <span className="flex items-center text-xs text-gray-400 project-name whitespace-nowrap p-0.5">
            <img src={search} alt="search" className="w-4 mr-2" />
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
