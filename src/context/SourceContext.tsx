import React, { createContext, useCallback, useContext, useState } from "react";
import { IFile } from "../types";

interface ISourceContext {
  projectName: string;
  updateProjectName: (name: string) => void;
  files: IFile[];
  setFiles: (file: IFile[]) => void;
  selected: string;
  setSelected: (id: string) => void;
  opened: string[];
  addOpenedFile: (id: string) => void;
  delOpenedFile: (id: string) => void;
  contextMenu: IFile;
  setContextMenu: (file: IFile) => void;
  showContextMenu: (e: React.MouseEvent, file: IFile) => void;
}

const SourceContext = createContext<ISourceContext>({
  projectName: "",
  updateProjectName: (name) => {},
  files: [] as IFile[],
  setFiles: (file) => {},
  selected: "",
  setSelected: (id) => {},
  opened: [],
  addOpenedFile: (id) => {},
  delOpenedFile: (id) => {},
  contextMenu: {} as IFile,
  setContextMenu: (file: IFile) => {},
  showContextMenu: (e: React.MouseEvent, file: IFile) => {},
});

export const SourceProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [selected, setSelected] = useState("");
  const [projectName, setProjectName] = useState("");
  const [files, setFiles] = useState<IFile[]>([]);
  const [opened, setOpenedFile] = useState<string[]>([]);
  const [contextMenu, setContextMenu] = useState<IFile>({} as IFile);

  const updateProjectName = (name: string) => {
    setProjectName(name);
  };

  const setSelect = (id: string) => {
    setSelected(id);
  };

  const addOpenedFile = useCallback(
    (id: string) => {
      if (opened.includes(id)) return;
      setOpenedFile((prevOpen) => [...prevOpen, id]);
    },
    [opened],
  );

  const delOpenedFile = useCallback(
    (id: string) => {
      setOpenedFile((prevOpen) => prevOpen.filter((opened) => opened !== id));
    },
    [opened],
  );

  const showContextMenu = (e: React.MouseEvent, file: IFile) => {
    e.preventDefault();
    const el = document.getElementById("context-menu") as HTMLDivElement;
    el.style.top = e.pageY + 8 + "px";
    el.style.left = e.pageX + "px";
    setContextMenu(file);
  };

  return (
    <SourceContext.Provider
      value={{
        selected,
        setSelected,
        opened,
        addOpenedFile,
        delOpenedFile,
        projectName,
        updateProjectName,
        files,
        setFiles,
        contextMenu,
        setContextMenu,
        showContextMenu,
      }}
    >
      {children}
    </SourceContext.Provider>
  );
};

export const useSource = () => {
  const {
    selected,
    setSelected,
    opened,
    addOpenedFile,
    delOpenedFile,
    projectName,
    updateProjectName,
    files,
    setFiles,
    contextMenu,
    setContextMenu,
    showContextMenu,
  } = useContext(SourceContext);

  return {
    selected,
    setSelected,
    opened,
    addOpenedFile,
    delOpenedFile,
    projectName,
    updateProjectName,
    files,
    setFiles,
    contextMenu,
    setContextMenu,
    showContextMenu,
  };
};
