import { useEffect, useRef, useState } from "react";
import { getFileObject, readFile, LANGUAGE_EXTENSIONS } from "@/libs";
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
        let lang =
          LANGUAGE_EXTENSIONS[file.name.split(".")[file.name.split(".").length - 1]] ||
          "javascript";
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
