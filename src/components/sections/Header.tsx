import { getCurrentWindow } from "@tauri-apps/api/window";
import { memo, useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  MaximizeIcon,
  MinusIcon,
  PanelBlockIcon,
  PanelDownOffIcon,
  PanelLeftIcon,
  PanelRightOffIcon,
  RestoreIcon,
  SearchIcon,
} from "../icons";

export const Header = memo(() => {
  const appWindow = getCurrentWindow();
  const [isMaximized, setIsMaximized] = useState(false);

  const onScaleUp = () => {
    appWindow.toggleMaximize();
    setIsMaximized(true);
  };
  const onScaleDown = () => {
    appWindow.toggleMaximize();
    setIsMaximized(false);
  };

  useEffect(() => {
    const checkMaximized = async () => {
      setIsMaximized(await appWindow.isMaximized());
    };
    checkMaximized();
  }, []);
  return (
    <div className="header-section" data-tauri-drag-region>
      <div className="header-main" data-tauri-drag-region>
        <div>
          <ArrowLeftIcon />
          <ArrowRightIcon />
        </div>
        <div className="text-container">
          <SearchIcon />
          <span>Codium</span>
        </div>
      </div>
      <div className="header-right">
        <div className="icons-container" data-tauri-drag-region>
          <PanelBlockIcon />
          <PanelLeftIcon />
          <PanelDownOffIcon />
          <PanelRightOffIcon />
        </div>
        <div
          className="header-button"
          title="Minimize"
          onClick={() => {
            appWindow.minimize();
          }}
        >
          <MinusIcon width={15} height={15} color="white" />
        </div>
        {isMaximized ? (
          <div className="header-button" title="Restore" onClick={onScaleDown}>
            <RestoreIcon width={15} height={15} color="white" />
          </div>
        ) : (
          <div className="header-button" title="Maximize" onClick={onScaleUp}>
            <MaximizeIcon width={15} height={15} color="white" />
          </div>
        )}
        <div
          className="header-button danger"
          title="Close"
          onClick={() => {
            appWindow.close();
          }}
        >
          <CloseIcon width={20} height={20} color="white" />
        </div>
      </div>
    </div>
  );
});
