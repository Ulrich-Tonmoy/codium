import { memo, useCallback, useEffect, useRef } from "react";
import { Sidebar } from "./sections/Sidebar";
import { Content } from "./sections/Content";
import * as monaco from "monaco-editor";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { useAppDispatch, useAppSelector } from "@/libs/redux-toolkit/hooks";
import { writeFile } from "@/libs/utils/fs-utils";
import { store } from "@/libs/redux-toolkit/store";
import { updateActiveFiles, updateIndent } from "@/libs/redux-toolkit/editorSlice";
import { TSelectedFile } from "@/libs/types/types";
import { getFileTypes, MainContext } from "@/libs/utils/explorer-builder";

export const Codium = memo((_props: any) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | undefined>(null);
  const editorFileRef = useRef<
    { editor_id: string; editor_state: monaco.editor.ICodeEditorViewState }[]
  >([]);

  const dispatch = useAppDispatch();
  const activeFiles = useAppSelector((state) => state.main.activeFiles);

  const handleSaveFile = useCallback((fullPath: string, content: string) => {
    const path = fullPath.startsWith("/") ? fullPath.slice(1) : fullPath;
    writeFile(path, content);

    setTimeout(() => {
      const modelEditingIndex = store
        .getState()
        .main.activeFiles.findIndex((file) => file.path == path);
      const modelEditing = {
        ...store.getState().main.activeFiles[modelEditingIndex],
      };
      const activeFile = [...store.getState().main.activeFiles];

      activeFile.splice(modelEditingIndex, 1);
      modelEditing.is_touched = false;
      activeFile[modelEditingIndex] = modelEditing;
      dispatch(updateActiveFiles(activeFile));
    }, 0);
  }, []);

  const handleSetEditor = useCallback(
    async (selectedFile: TSelectedFile) => {
      if (editorRef.current != undefined) {
        const currentModel = editorRef.current.getModel()!;
        const currentModelIndex = editorFileRef.current.findIndex(
          (editor) => editor.editor_id === currentModel.uri.path,
        );
        if (currentModelIndex > -1) {
          editorFileRef.current.splice(currentModelIndex, 1);
          editorFileRef.current.push({
            editor_id: currentModel.uri.path,
            editor_state: editorRef.current.saveViewState()!,
          });
        } else {
          editorFileRef.current.push({
            editor_id: currentModel.uri.path,
            editor_state: editorRef.current.saveViewState()!,
          });
        }

        const targetModel = monaco.editor
          .getModels()
          .filter((model) => model.uri.path.includes(selectedFile.path));
        if (targetModel.length > 0) {
          const modelIndex = editorFileRef.current.findIndex((editor) =>
            editor.editor_id.includes(selectedFile.path),
          );
          editorRef.current.setModel(targetModel[0]);

          return (
            modelIndex > -1 &&
            editorRef.current.restoreViewState(
              editorFileRef.current[modelIndex].editor_state,
            )
          );
        }
      }

      const newModel = monaco.editor.createModel(
        selectedFile.content,
        getFileTypes(selectedFile.name),
        monaco.Uri.file(selectedFile.path),
      );

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: 4,
        baseUrl: selectedFile.path.split(/\\|\//g).at(-1),
      });
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });

      if (editorRef.current == undefined) {
        editorRef.current = monaco.editor.create(
          document.querySelector(".editor-container")!,
          { theme: "vs-dark" },
        );
      }

      editorRef.current.setModel(newModel);

      editorRef.current.onKeyUp((e) => {
        if (e.ctrlKey && e.keyCode == 49) {
          return handleSaveFile(
            editorRef.current!.getModel()!.uri.path,
            editorRef.current!.getValue(),
          );
        }
      });

      editorRef.current.onDidChangeModelContent((_e) => {
        const modelEditingIndex = store
          .getState()
          .main.activeFiles.findIndex((file) =>
            editorRef.current!.getModel()!.uri.path.includes(file.path),
          );
        const modelEditing = {
          ...store.getState().main.activeFiles[modelEditingIndex],
        };
        const activeFile = [...store.getState().main.activeFiles];

        activeFile.splice(modelEditingIndex, 1);
        modelEditing.is_touched = true;
        activeFile[modelEditingIndex] = modelEditing;
        dispatch(updateActiveFiles(activeFile));
      });

      editorRef.current.onDidChangeCursorPosition((e) => {
        dispatch(
          updateIndent({
            line: e.position.lineNumber,
            column: e.position.column,
          }),
        );
      });
    },
    [editorRef.current, editorFileRef.current, activeFiles],
  );

  const handleRemoveEditor = useCallback(
    async (selectedFile: TSelectedFile) => {
      const isCurrentModel = editorRef.current!.getModel()!.uri.path == selectedFile.path;
      const allModels = monaco.editor.getModels();
      const targetModelIndex = allModels.findIndex(
        (model) => model.uri.path == selectedFile.path,
      );
      // monaco.editor.add
      // monaco.editor.getModels().splice(targetModelIndex, 1)
      console.log("monaco.editor.getModels().length", monaco.editor.getModels().length);
      monaco.editor.getModels()[targetModelIndex].dispose();

      console.log("monaco.editor.getModels().length", monaco.editor.getModels().length);
      if (isCurrentModel) {
        const new_index = targetModelIndex == 0 ? targetModelIndex : targetModelIndex - 1;

        if (monaco.editor.getModels().length > 0) {
          editorRef.current!.setModel(monaco.editor.getModels()[new_index]);
        } else {
          editorRef.current!.dispose();
          editorRef.current = undefined;
        }
      }
    },
    [editorRef.current],
  );

  const handleWinBlur = useCallback(() => {
    console.log("win is blur");
    return;
    const blurredActiveFiles = store
      .getState()
      .main.activeFiles.filter((file) => file.is_touched == true);
    blurredActiveFiles.forEach((file) => {
      handleSaveFile(
        file.path,
        monaco.editor
          .getModels()
          .find((model) => model.uri.path == file.path)!
          .getValue(),
      );
    });
  }, []);

  useEffect(() => {
    // Save the selected file on blur
    window.addEventListener("blur", handleWinBlur);
    return () => window.removeEventListener("blur", handleWinBlur);
  }, []);

  return (
    <MainContext.Provider value={{ handleSetEditor, handleRemoveEditor }}>
      <div className="wrapper-component">
        <Header />
        <div className="middle-section">
          <Sidebar />
          <Content />
        </div>
        <Footer />
      </div>
    </MainContext.Provider>
  );
});
