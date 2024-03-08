import { useEffect, useRef, useState } from "react";
import { getFileObject, readFile, LANGUAGE_EXTENSIONS, IFile } from "@/libs";
import "@/libs/monacoWorker";
import * as monaco from "monaco-editor";
import ts from "typescript";

interface MonacoEditorProps {
  path: string;
  active: boolean;
  config: IFile;
}

export const MonacoEditor = ({ path, active, config }: MonacoEditorProps) => {
  const editorRef = useRef<HTMLElement | null>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const modelRef = useRef<monaco.editor.ITextModel | null>(null);

  useEffect(() => {
    const updateEditorContent = async () => {
      if (editorRef) {
        const file = getFileObject(path);
        const content = await readFile(file.path);
        const compilerOptions: any = await readFile(config.path);
        const modelUri = monaco.Uri.file(file.path);
        let lang =
          LANGUAGE_EXTENSIONS[file.name.split(".")[file.name.split(".").length - 1]] ||
          "javascript";

        if (modelRef.current) {
          modelRef.current.dispose();
        }
        modelRef.current = monaco.editor.createModel(content, lang, modelUri);
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          tsx: ts.JsxEmit.React,
          jsx: ts.JsxEmit.React,
          ...compilerOptions,
        });
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          `
          declare module 'react' {
            export = React;
          }
          declare module 'react-dom' {
            export = ReactDOM;
          }
          `,
          "react-dom.d.ts",
        );
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false,
        });

        setEditor((editor) => {
          if (editor) {
            editor.setModel(modelRef.current);
            return editor;
          }
          const monacoEditor = monaco.editor.create(editorRef.current!, {
            model: modelRef.current,
            theme: "vs-dark",
          });
          return monacoEditor;
        });
      }
    };

    updateEditorContent();

    return () => {
      editor?.dispose();
      modelRef.current?.dispose();
    };
  }, [editorRef, path, active]);

  if (!active) return;

  return <main ref={editorRef} className="w-full overflow-y-auto h-[calc(100vh-40px)]" />;
};
