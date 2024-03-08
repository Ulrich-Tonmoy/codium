import { create } from "zustand";
import { IFile } from "@/libs";

interface ISourceState {
  projectName: string;
  files: IFile[];
  selected: string;
  opened: string[];
  updateProjectName: (projectName: string) => void;
  setFiles: (files: IFile[]) => void;
  setSelected: (selected: string) => void;
  addOpenedFile: (id: string) => void;
  closeOpenedFile: (id: string) => void;
}

export const useExplorer = create<ISourceState>((set) => ({
  projectName: "",
  files: [],
  selected: "",
  opened: [],
  updateProjectName: (projectName: string) => set((state) => ({ ...state, projectName })),
  setFiles: (files: IFile[]) => set((state) => ({ ...state, files })),
  setSelected: (selected: string) => set((state) => ({ ...state, selected })),
  addOpenedFile: (path: string) =>
    set((state) => {
      if (state.opened.includes(path)) return { ...state };
      return { ...state, opened: [...state.opened, path] };
    }),
  closeOpenedFile: (path: string) =>
    set((state) => ({
      ...state,
      opened: state.opened.filter((openedPath) => openedPath !== path),
    })),
}));
