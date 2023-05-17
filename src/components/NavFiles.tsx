import { MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IFile } from "./../types/index";
import FileIcon from "./FileIcon";
import NavFolderItem from "./NavFolderItem";
import {
  addOpenedFile,
  setContextMenu,
  setSelected,
} from "../redux/sourceSlice";

interface Props {
  files: IFile[];
  visible: boolean;
}

const NavFiles = ({ visible, files }: Props) => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state: RootState) => state.source);

  const onShow = async (
    e: MouseEvent<HTMLDivElement, MouseEvent>,
    file: IFile,
  ) => {
    e.stopPropagation();

    if (file.kind === "file") {
      dispatch(setSelected(file.id));
      dispatch(addOpenedFile(file.id));
    }
  };

  const showContextMenu = (e: React.MouseEvent, file: IFile) => {
    e.preventDefault();
    const el = document.getElementById("context-menu") as HTMLDivElement;
    el.style.top = e.pageY + 8 + "px";
    el.style.left = e.pageX + "px";
    dispatch(setContextMenu(file));
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
            } flex items-center ml-4 gap-2 py-0.5 text-gray-500 hover:text-gray-300 cursor-pointer`}
            onContextMenu={(e: MouseEvent) =>
              showContextMenu(e as MouseEvent, file)
            }
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
