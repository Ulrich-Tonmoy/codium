import { createContext, useCallback, useContext, useState } from "react";

interface ISourceContext {
  selected: string;
  setSelected: (id: string) => void;
  opened: string[];
  addOpenedFile: (id: string) => void;
  delOpenedFile: (id: string) => void;
}

const SourceContext = createContext < ISourceContext > ({
  selected: "",
  setSelected: (id) => { },
  opened: [],
  addOpenedFile: (id) => { },
  delOpenedFile: (id) => { },
});

export const SourceProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [selected, setSelected] = useState("");
  const [opened, setOpenedFile] = useState < string[] > ([]);

  const setSelect = (id: string) => {
    setSelected(id);
  };
  const addOpenedFile = useCallback((id: string) => {
    setOpenedFile((prevOpen) => [...prevOpen, id]);
  }, []);
  const delOpenedFile = useCallback((id: string) => {
    setOpenedFile((prevOpen) => prevOpen.filter((opened) => opened !== id));
  }, []);

  return (
    <SourceContext.Provider
      value={{ selected, setSelected, opened, addOpenedFile, delOpenedFile }}
    >
      {children}
    </SourceContext.Provider>
  );
};

export const useSource = () => {
  const { selected, setSelected, opened, addOpenedFile, delOpenedFile } =
    useContext(SourceContext);

  return { selected, setSelected, opened, addOpenedFile, delOpenedFile };
};
