import { IFile, getFileObject, useHorizontalScroll, useExplorer } from "@/libs";
import { FileIcon, PreviewImage, MonacoEditor } from "@/components";
import { MouseEvent } from "react";
import { close } from "@/assets";

export const CodeArea = () => {
  const { selected, setSelected, closeOpenedFile, opened, files } = useExplorer();
  const config = files.find((file) => file.name === "tsconfig.json") as IFile;

  const scrollRef = useHorizontalScroll();

  const isImage = (name: string) => {
    return [".png", ".gif", ".jpeg", ".jpg", ".bmp", ".ico"].some(
      (ext) => name.lastIndexOf(ext) !== -1,
    );
  };

  const onSelectItem = (path: string) => {
    setSelected(path);
  };

  const onClose = (e: MouseEvent<HTMLElement, MouseEvent>, path: string) => {
    e.stopPropagation();
    closeOpenedFile(path);
  };

  return (
    <div id="code-area" className="w-full h-full">
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto border-b divide-x code-tab-items border-stone-800 divide-stone-800"
      >
        {opened?.map((path: any) => {
          const file = getFileObject(path) as IFile;
          const active = selected === path ? "bg-[#222426] text-gray-400" : "";

          return (
            <div
              onClick={() => onSelectItem(file.path)}
              className={`tab-item shrink-0 px-2 py-0.5 text-gray-500 cursor-pointer hover:text-gray-400 flex items-center gap-2 ${active}`}
              key={file.path}
            >
              <FileIcon name={file.name} size="sm" />
              <span>{file.name}</span>
              <img
                id="ttb-close"
                className="w-5 hover:bg-red-400"
                src={close}
                alt="Close"
                title="Close"
                // @ts-ignore
                onClick={(e) => onClose(e, path)}
              />
            </div>
          );
        })}
      </div>
      <div className="code-contents">
        {opened.map((path: any, index: any) => {
          const file = getFileObject(path) as IFile;
          if (isImage(file.name)) {
            return (
              <PreviewImage key={index} path={file.path} active={path === selected} />
            );
          }

          return (
            <MonacoEditor
              key={index}
              path={path}
              active={path === selected}
              config={config}
            />
          );
        })}
      </div>
    </div>
  );
};
