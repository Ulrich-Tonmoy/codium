import { createContext, useCallback, useContext, useState } from "react";
import { IFile } from "../types";

interface ISourceContext {
  projectName: string;
  updateProjectName: (name: string) => void;
  files: IFile[];
  setFiles: (file: IFile[]) => {};
  selected: string;
  setSelected: (id: string) => void;
  opened: string[];
  addOpenedFile: (id: string) => void;
  delOpenedFile: (id: string) => void;
}

const SourceContext = createContext<ISourceContext>({
  projectName: "",
  updateProjectName: (name) => {},
  files: "",
  setFiles: (file) => {},
  selected: "",
  setSelected: (id) => {},
  opened: [],
  addOpenedFile: (id) => {},
  delOpenedFile: (id) => {},
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
  };
};
