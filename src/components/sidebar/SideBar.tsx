import useSidebar from "@/lib/hooks/use-sidebar-store";
import Explorer from "./Explorer";

const SideBar = () => {
  const { activeSidebarName } = useSidebar();

  if (activeSidebarName === "Explorer") return <Explorer />;
  else if (activeSidebarName === "Search") return <Explorer />;
  else if (activeSidebarName === "Terminal") return <Explorer />;
  else if (activeSidebarName === "Git") return <Explorer />;
  else if (activeSidebarName === "Settings") return <Explorer />;

  return <></>;
};

export default SideBar;
