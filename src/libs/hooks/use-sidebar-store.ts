import { create } from "zustand";

export type SideBarType =
  | "None"
  | "Explorer"
  | "Search"
  | "Terminal"
  | "Git"
  | "Settings";

interface ISourceState {
  activeSidebarName: SideBarType;
  toggleSidebar: (activeSidebarName: SideBarType) => void;
}

export const useSidebar = create<ISourceState>((set) => ({
  activeSidebarName: "Explorer",
  toggleSidebar: (activeSidebarName: SideBarType) =>
    set((state) => {
      if (state.activeSidebarName === activeSidebarName)
        return { ...state, activeSidebarName: "None" };
      else return { ...state, activeSidebarName };
    }),
}));
