import { create } from "zustand";
import { IFile } from "../types";

interface ISourceState {
  projectName: string;
  files: IFile[];
  selected: string;
  opened: string[];
  contextMenu: IFile;
  updateProjectName: (projectName: string) => void;
  setFiles: (files: IFile[]) => void;
  setSelected: (selected: string) => void;
  addOpenedFile: (id: string) => void;
  closeOpenedFile: (id: string) => void;
  setContextMenu: (contextMenu: IFile) => void;
}

const useExplorer = create<ISourceState>((set) => ({
  projectName: "",
  files: [],
  selected: "",
  opened: [],
  contextMenu: {} as IFile,
  updateProjectName: (projectName: string) => set((state) => ({ ...state, projectName })),
  setFiles: (files: IFile[]) => set((state) => ({ ...state, files })),
  setSelected: (selected: string) => set((state) => ({ ...state, selected })),
  addOpenedFile: (id: string) =>
    set((state) => ({ ...state, opened: [...state.opened, id] })),
  closeOpenedFile: (id: string) =>
    set((state) => ({
      ...state,
      opened: state.opened.filter((openedId) => openedId !== id),
    })),
  setContextMenu: (contextMenu: IFile) => set((state) => ({ ...state, contextMenu })),
}));

export default useExplorer;
