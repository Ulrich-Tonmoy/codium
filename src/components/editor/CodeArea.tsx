import { IFile, getFileObject, useHorizontalScroll, useExplorer } from "@/libs";
import { FileIcon, PreviewImage, MonacoEditor } from "@/components";
import { MouseEvent } from "react";
import { close } from "@/assets";

export const CodeArea = () => {
  const { selected, setSelected, closeOpenedFile, opened } = useExplorer();

  const scrollRef = useHorizontalScroll();

  const isImage = (name: string) => {
    return [".png", ".gif", ".jpeg", ".jpg", ".bmp"].some(
      (ext) => name.lastIndexOf(ext) !== -1,
    );
  };

  const onSelectItem = (id: string) => {
    setSelected(id);
  };

  const onClose = (e: MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    closeOpenedFile(id);
  };

  return (
    <div id="code-area" className="w-full h-full">
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto border-b divide-x code-tab-items border-stone-800 divide-stone-800"
      >
        {opened?.map((item: any) => {
          const file = getFileObject(item) as IFile;
          const active = selected === item ? "bg-[#222426] text-gray-400" : "";

          return (
            <div
              onClick={() => onSelectItem(file.id)}
              className={`tab-item shrink-0 px-2 py-0.5 text-gray-500 cursor-pointer hover:text-gray-400 flex items-center gap-2 ${active}`}
              key={file.id}
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
                onClick={(e) => onClose(e, item)}
              />
            </div>
          );
        })}
      </div>
      <div className="code-contents">
        {opened.map((item: any, index: any) => {
          const file = getFileObject(item) as IFile;
          if (isImage(file.name)) {
            return (
              <PreviewImage key={index} path={file.path} active={item === selected} />
            );
          }

          return <MonacoEditor key={index} id={item} active={item === selected} />;
        })}
      </div>
    </div>
  );
};
