import { useSidebar } from "@/libs";
import { Explorer } from "@/components";

export const SideBar = () => {
  const { activeSidebarName } = useSidebar();

  if (activeSidebarName === "Explorer") return <Explorer />;
  else if (activeSidebarName === "Search") return <Explorer />;
  else if (activeSidebarName === "Terminal") return <Explorer />;
  else if (activeSidebarName === "Git") return <Explorer />;
  else if (activeSidebarName === "Settings") return <Explorer />;

  return <></>;
};
