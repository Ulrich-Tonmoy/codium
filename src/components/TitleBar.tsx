import { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";

const TitleBar = () => {
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
        <img src="/logo.png" alt="codium" style={{ width: 10 }} />
        <span className="text-xs capitalize text-green-500">Codium</span>
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
