import { MouseEvent } from "react";
import { useSource } from "../context/SourceContext";
import { IFile } from "./../types/index";

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
    }
  };

  return (
    <div className={`source-code ${visible ? "" : "hidden"}`}>
      {files?.map((file) => {
        const isSelected = file.id === selected;

        return (
          <div
            onClick={(e) => onShow(e, file)}
            key={file.id}
            className={`source-item ${
              isSelected ? "source-item-active" : ""
            } flex items-center gap-2 px-2 py-0.5 text-gray-500 hover:text-gray-300 cursor-pointer`}
          >
            {file.kind === "directory" ? (
              <i className="text-yellow-500 ri-folder-fill"></i>
            ) : (
              <i></i>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavFiles;
