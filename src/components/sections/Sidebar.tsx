import { memo } from "react";
import {
  AccountIcon,
  DebugAltIcon,
  ExtensionIcon,
  FileIcon,
  SearchIcon,
  SettingsGearIcon,
  SourceIcon,
} from "@/assets";
import { Link, Outlet, useLocation } from "react-router";

export const Sidebar = memo((_props: any) => {
  const route = useLocation();
  return (
    <div className="sidebar-section">
      <div className="icon-list">
        <div>
          <Link
            to="/explorer"
            className={`icon ${route.pathname == "/explorer" ? "active" : ""}`}
          >
            <FileIcon />
            <div className="tooltip">Explorer</div>
          </Link>
          <Link
            to="/search"
            className={`icon ${route.pathname == "/search" ? "active" : ""}`}
          >
            <SearchIcon />
            <div className="tooltip">Search</div>
          </Link>
          <Link
            to="/source"
            className={`icon ${route.pathname == "/source" ? "active" : ""}`}
          >
            <SourceIcon />
            <div className="tooltip">Source Control</div>
          </Link>
          <Link
            to="/debug"
            className={`icon ${route.pathname == "/debug" ? "active" : ""}`}
          >
            <DebugAltIcon />
            <div className="tooltip">Run & Debug</div>
          </Link>
          <Link
            to="/extension"
            className={`icon ${route.pathname == "/extension" ? "active" : ""}`}
          >
            <ExtensionIcon />
            <div className="tooltip">Extensions</div>
          </Link>
        </div>
        <div>
          <Link
            to="/account"
            className={`icon ${route.pathname == "/account" ? "active" : ""}`}
          >
            <AccountIcon />
            <div className="tooltip">Accounts</div>
          </Link>
          <Link
            to="/settings"
            className={`icon ${route.pathname == "/settings" ? "active" : ""}`}
          >
            <SettingsGearIcon />
            <div className="tooltip">Settings</div>
          </Link>
        </div>
      </div>
      <div className="explorer-list">
        <Outlet />
      </div>
    </div>
  );
});
