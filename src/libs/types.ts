export interface IFolderStructure {
  name: string;
  root: string;
  tree: TFolderTree[];
}

export type TFolderTree = {
  name: string;
  isDirectory: boolean;
  path: string;
  children: TFolderTree[];
};

export interface IMainState {
  folderStructure: IFolderStructure;
  activeFiles: TActiveFile[];
  activeFile: TActiveFile;
  indent: TIndent;
}

export type TActiveFile = {
  path: string;
  name: string;
  icon: any;
  is_touched: boolean;
};

export type TIndent = {
  line: number;
  column: number;
};

export type TSelectedFile = {
  name: string;
  path: string;
  content: string;
};

export interface IMainContext {
  handleSetEditor: Function;
  handleRemoveEditor: Function;
}
