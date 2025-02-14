import { memo, useCallback, useContext, useLayoutEffect, useRef } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@/assets";
import { useAppDispatch, useAppSelector } from "@/libs/redux-toolkit/hooks";
import { MainContext, makeContentList } from "@/libs/utils/explorer-builder";
import { TActiveFile, TSelectedFile } from "@/libs/types/types";
import FileIcon from "@/libs/utils/file-icon";
import { store } from "@/libs/redux-toolkit/store";
import { updateActiveFile, updateActiveFiles } from "@/libs/redux-toolkit/editorSlice";
import { getFileContent } from "@/libs/utils/fs-utils";

export const Explorer = memo((_props: any) => {
  const contentMainDivRef = useRef<HTMLDivElement | null>(null);
  const folderStructure = useAppSelector((state) => state.main.folderStructure);
  const dispatch = useAppDispatch();
  const activeFiles = useAppSelector((state) => state.main.activeFiles);

  const useMainContext = useContext(MainContext);

  const handleSetEditor = useCallback(
    async (branchName: string, fullPath: string) => {
      const activeFile: TActiveFile = {
        path: fullPath,
        name: branchName,
        icon: <FileIcon name={branchName} />,
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

  // TODO: remove later using for debugging purposes
  const isInitialized = useRef(false);
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
            <ChevronDownIcon />
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
