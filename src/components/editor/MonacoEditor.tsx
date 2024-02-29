import { useEffect, useRef, useState } from "react";
import { getFileObject, readFile } from "@/libs";
import "@/libs/monacoWorker";
import * as monaco from "monaco-editor";

interface MonacoEditorProps {
  id: string;
  active: boolean;
}

export const MonacoEditor = ({ id, active }: MonacoEditorProps) => {
  const editorRef = useRef<HTMLElement | null>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const updateEditorContent = async () => {
      if (editorRef) {
        const file = getFileObject(id);
        const content = await readFile(file.path);
        let lang = "typescript";
        switch (file.name.split(".")[file.name.split(".").length - 1]) {
          case "tsx":
            lang = "typescript";
            break;
          case "ts":
            lang = "typescript";
            break;
          case "css":
            lang = "css";
            break;
          case "html":
            lang = "html";
            break;
          case "json":
            lang = "json";
            break;
          case "md":
            lang = "markdown";
            break;
          default:
            lang = "javascript";
            break;
        }
        setEditor((editor) => {
          if (editor) return editor;
          return monaco.editor.create(editorRef.current!, {
            value: content,
            language: lang,
            theme: "vs-dark",
          });
        });
      }
    };

    updateEditorContent();

    return () => editor?.dispose();
  }, [editorRef, id, active]);

  if (!active) return;

  return <main ref={editorRef} className="w-full overflow-y-auto h-[calc(100vh-40px)]" />;
};