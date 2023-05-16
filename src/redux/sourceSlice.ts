import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../types";

interface ISourceState {
  projectName: string;
  files: IFile[];
  selected: string;
  opened: string[];
  contextMenu: IFile;
}

const initialState: ISourceState = {
  projectName: "",
  files: [],
  selected: "",
  opened: [],
  contextMenu: {} as IFile,
};

const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    updateProjectName(state, action: PayloadAction<string>) {
      state.projectName = action.payload;
    },
    setFiles(state, action: PayloadAction<IFile[]>) {
      state.files = action.payload;
    },
    setSelected(state, action: PayloadAction<string>) {
      state.selected = action.payload;
    },
    addOpenedFile(state, action: PayloadAction<string>) {
      if (!state.opened.includes(action.payload)) {
        state.opened.push(action.payload);
      }
    },
    delOpenedFile(state, action: PayloadAction<string>) {
      state.opened = state.opened.filter((id) => id !== action.payload);
    },
    setContextMenu(state, action: PayloadAction<IFile>) {
      state.contextMenu = action.payload;
    },
  },
});

export const { 
  updateProjectName, 
  setFiles, 
  setSelected, 
  addOpenedFile, 
  delOpenedFile,
  setContextMenu
} = sourceSlice.actions;

export default sourceSlice.reducer;
