import { MouseEvent } from "react";
import { IFile, useExplorer } from "@/libs";
import { FileIcon, NavFolderItem } from "@/components";

interface Props {
  files: IFile[];
  visible: boolean;
}

export const NavFiles = ({ visible, files }: Props) => {
  const { selected, setSelected, addOpenedFile } = useExplorer();

  const onShow = async (e: MouseEvent<HTMLDivElement, MouseEvent>, file: IFile) => {
    e.stopPropagation();

    setSelected(file.path);
    addOpenedFile(file.path);
  };

  return (
    <div className={`source-codes ${visible ? "" : "hidden"}`}>
      {files?.map((file) => {
        const isSelected = file.path === selected;

        if (file.children) {
          return <NavFolderItem active={isSelected} key={file.path} file={file} />;
        }

        return (
          <div
            // @ts-ignore
            onClick={(e) => onShow(e, file)}
            key={file.path}
            className={`source-item ${
              isSelected ? "source-item-active" : ""
            } flex items-center ml-4 gap-2 py-0.5 text-gray-500 hover:text-gray-300 cursor-pointer`}
          >
            <FileIcon name={file.name} />
            <span>{file.name}</span>
          </div>
        );
      })}
    </div>
  );
};
