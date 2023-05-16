import NavFiles from "./NavFiles";
import { useSelector } from "react-redux";
import ContextMenu from "./ContextMenu";

const SideBar = () => {
  const { files } = useSelector((state: RootState) => state.source);

  return (
    <aside id="sidebar" className="h-full w-60 shrink-0 bg-darken">
      <div className="sidebar-header flex items-center justify-between p-2.5">
        <span className="cursor-default project-explorer">Explorer</span>
        <span className="text-xs text-gray-400 cursor-pointer project-name whitespace-nowrap">
          <i className="ri-more-fill"></i>
        </span>
      </div>
      <div className="code-structure">
        <NavFiles visible={true} files={files} />
      </div>
      <ContextMenu />
    </aside>
  );
};

export default SideBar;
