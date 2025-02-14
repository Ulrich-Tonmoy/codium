import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFolderStructure, IMainState, TActiveFile, TIndent } from "../types/types";

const initialState: IMainState = {
  folderStructure: {} as IFolderStructure,
  activeFiles: [],
  activeFile: {} as TActiveFile,
  indent: { column: 0, line: 0 } as TIndent,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setFolderStructure: (state, action: PayloadAction<IFolderStructure>) => {
      state.folderStructure = action.payload;
    },
    updateActiveFiles: (state, action: PayloadAction<TActiveFile[]>) => {
      state.activeFiles = action.payload;
    },
    updateActiveFile: (state, action: PayloadAction<TActiveFile>) => {
      state.activeFile = action.payload;
    },
    updateIndent: (state, action: PayloadAction<TIndent>) => {
      state.indent = action.payload;
    },
  },
});

export const { setFolderStructure, updateActiveFiles, updateActiveFile, updateIndent } =
  mainSlice.actions;

export default mainSlice.reducer;
