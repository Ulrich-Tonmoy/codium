import { memo, useCallback, useContext } from "react";
import { CloseIcon, VSCodeIcon } from "@/assets";
import { useAppDispatch, useAppSelector } from "@/libs/redux-toolkit/hooks";
import { getFolderTree } from "@/libs/utils/fs-utils";
import { MainContext } from "@/libs/utils/explorer-builder";
import {
  setFolderStructure,
  updateActiveFile,
  updateActiveFiles,
} from "@/libs/redux-toolkit/editorSlice";
import { TActiveFile } from "@/libs/types/types";

export const Content = memo((_props: any) => {
  const dispatch = useAppDispatch();
  const folderTree = useAppSelector((state) => state.main.folderStructure);
  const activeFiles = useAppSelector((state) => state.main.activeFiles);
  const activeFile = useAppSelector((state) => state.main.activeFile);

  const useMainContextIn = useContext(MainContext);

  const handleOpenDir = useCallback(async () => {
    const folder = await getFolderTree();
    folder.name && dispatch(setFolderStructure(folder));
  }, []);

  const handleSetSelectedFile = useCallback(
    (activeFile: TActiveFile) => {
      dispatch(updateActiveFile(activeFile));
      useMainContextIn.handleSetEditor(activeFile);
    },
    [activeFiles],
  );

  const handleRemoveFile = useCallback(
    (e: MouseEvent, file: TActiveFile) => {
      // TODO: Check if the file is_touched or not
      e.stopPropagation();
      const clone = [...activeFiles];
      const indexToRemove = clone.findIndex((_t) => _t.path == file.path);
      const targetFile = clone[indexToRemove];
      clone.splice(indexToRemove, 1);
      const nextIndex = indexToRemove == 0 ? indexToRemove : indexToRemove - 1;
      activeFile.path == file.path && dispatch(updateActiveFile(clone[nextIndex]));
      dispatch(updateActiveFiles(clone));
      useMainContextIn.handleRemoveEditor(targetFile);
    },
    [activeFiles, activeFile],
  );

  return (
    <div className="content-section">
      {!folderTree.name && (
        <div className="default-screen">
          <button onClick={handleOpenDir}>Open New Folder</button>
        </div>
      )}
      {folderTree.name && activeFiles.length === 0 ? (
        <div className="no-selected-files">
          <VSCodeIcon />
        </div>
      ) : (
        <div className="content-inner">
          <div className="page-tabs-cont">
            {activeFiles?.map((file, index) => (
              <div
                className={"tab" + (activeFile?.path == file.path ? " active" : "")}
                key={index}
                onClick={() => handleSetSelectedFile(file)}
              >
                <span>{file.icon}</span>
                <span>{file.name}</span>
                <span
                  onClick={(e) => handleRemoveFile(e as any, file)}
                  className={file.is_touched ? "is_touched" : ""}
                >
                  <CloseIcon />
                  <span></span>
                </span>
              </div>
            ))}
          </div>
          <div className="editor-container" />
        </div>
      )}
    </div>
  );
});
