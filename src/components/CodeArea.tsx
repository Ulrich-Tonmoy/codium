import { IFile } from "../types";
import { getFileObject } from "../stores/file";
import FileIcon from "./FileIcon";
import useHorizontalScroll from "../helpers/useHorizontalScroll";
import PreviewImage from "./PreviewImage";
import CodeEditor from "./CodeEditor";
import { MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delOpenedFile, setSelected } from "../redux/sourceSlice";

const CodeArea = () => {
  const dispatch = useDispatch();
  const { selected, opened } = useSelector((state: RootState) => state.source);

  const scrollRef = useHorizontalScroll();

  const isImage = (name: string) => {
    return [".png", ".gif", ".jpeg", ".jpg", ".bmp"].some(
      (ext) => name.lastIndexOf(ext) !== -1,
    );
  };

  const onSelectItem = (id: string) => {
    dispatch(setSelected(id));
  };

  const close = (e: MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    dispatch(delOpenedFile(id));
  };

  return (
    <div id="code-area" className="w-full h-full">
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto border-b divide-x code-tab-items border-stone-800 divide-stone-800"
      >
        {opened?.map((item) => {
          const file = getFileObject(item) as IFile;
          const active = selected === item ? "bg-darken text-gray-400" : "";

          return (
            <div
              onClick={() => onSelectItem(file.id)}
              className={`tab-item shrink-0 px-3 py-1.5 text-gray-500 cursor-pointer hover:text-gray-400 flex items-center gap-2 ${active}`}
              key={file.id}
            >
              <FileIcon name={file.name} size="sm" />
              <span>{file.name}</span>
              <i
                // @ts-ignore
                onClick={(e) => close(e, item)}
                className="px-0.5 rounded-md ri-close-line hover:bg-red-400 hover:text-white"
              ></i>
            </div>
          );
        })}
      </div>
      <div className="code-contents">
        {opened.map((item, index) => {
          const file = getFileObject(item) as IFile;
          if (isImage(file.name)) {
            return (
              <PreviewImage
                key={index}
                path={file.path}
                active={item === selected}
              />
            );
          }

          return (
            <CodeEditor key={index} id={item} active={item === selected} />
          );
        })}
      </div>
    </div>
  );
};

export default CodeArea;
