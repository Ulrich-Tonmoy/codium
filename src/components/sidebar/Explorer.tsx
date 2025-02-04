import { updateActiveFile, updateActiveFiles, updateIndent } from "@/libs/editorSlice";
import { MainContext, makeContentList } from "@/libs/explorerBuilder";
import FileIcon from "@/libs/fileIcon";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { TActiveFile, TSelectedFile } from "@/libs/types";
import { memo, useCallback, useContext, useLayoutEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { getFileContent } from "@/libs/fsUtils";
import { store } from "@/libs/store";

export const Explorer = memo((props: any) => {
  const contentMainDivRef = useRef<HTMLDivElement | null>(null);
  const folderStructure = useAppSelector((state) => state.main.folderStructure);
  const dispatch = useAppDispatch();
  const activeFiles = useAppSelector((state) => state.main.activeFiles);

  const useMainContext = useContext(MainContext);

  // TODO: remove later using for debugging purposes
  const isInitialized = useRef(false);

  const handleSetEditor = useCallback(
    async (branchName: string, fullPath: string) => {
      const activeFile: TActiveFile = {
        path: fullPath,
        name: branchName,
        icon: <FileIcon type={branchName.split(".").at(-1)!} />,
        is_touched: false,
      };
      if (
        store.getState().main.activeFiles.findIndex((file) => file.path == fullPath) == -1
      ) {
        store.dispatch(
          updateActiveFiles([...store.getState().main.activeFiles, activeFile]),
        );
      }
      dispatch(updateActiveFile(activeFile));

      const fileContent = await getFileContent(fullPath);
      const selectedFile: TSelectedFile = {
        name: branchName,
        path: fullPath,
        content: fileContent,
      };

      setTimeout(() => {
        useMainContext.handleSetEditor(selectedFile);
      }, 0);
    },
    [activeFiles],
  );

  const handleDisplayFileList = useCallback(() => {
    if (!folderStructure.name || isInitialized.current) return;
    makeContentList(contentMainDivRef.current!, folderStructure.tree, handleSetEditor);
    isInitialized.current = true;
  }, [folderStructure, contentMainDivRef.current]);

  useLayoutEffect(() => {
    handleDisplayFileList();
  }, [folderStructure, contentMainDivRef.current]);

  return (
    <div className="folder-tree">
      <div className="title">Explorer</div>
      <div className="explorer-content-wrapper">
        <div className="content-list-outer-container">
          <div>
            <ChevronLeftIcon />
            <span>{folderStructure?.name?.split(/\/|\\/).at(-1)}</span>
          </div>
          <div ref={contentMainDivRef} className="content-list main"></div>
        </div>
        <div>
          <ChevronRightIcon />
          <span>Outline</span>
        </div>
        <div>
          <ChevronRightIcon />
          <span>Timeline</span>
        </div>
      </div>
    </div>
  );
});
