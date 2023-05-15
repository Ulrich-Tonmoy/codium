import { MouseEvent } from "react";
import { useSource } from "../context/SourceContext";
import { IFile } from "./../types/index";
import FileIcon from "./FileIcon";
import NavFolderItem from "./NavFolderItem";

interface Props {
  files: IFile[];
  visible: boolean;
}

const NavFiles = ({ visible, files }: Props) => {
  const { setSelected, selected, addOpenedFile } = useSource();

  const onShow = async (
    e: MouseEvent<HTMLDivElement, MouseEvent>,
    file: IFile,
  ) => {
    e.stopPropagation();

    if (file.kind === "file") {
      setSelected(file.id);
      addOpenedFile(file.id);
    }
  };

  return (
    <div className={`source-codes ${visible ? "" : "hidden"}`}>
      {files?.map((file) => {
        const isSelected = file.id === selected;

        if (file.kind === "directory") {
          return (
            <NavFolderItem active={isSelected} key={file.id} file={file} />
          );
        }

        return (
          <div
            // @ts-ignore
            onClick={(e) => onShow(e, file)}
            key={file.id}
            className={`source-item ${
              isSelected ? "source-item-active" : ""
            } flex items-center gap-2 px-2 py-0.5 text-gray-500 hover:text-gray-300 cursor-pointer`}
          >
            <FileIcon name={file.name} />
            <span>{file.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default NavFiles;
