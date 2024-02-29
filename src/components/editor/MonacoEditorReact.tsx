import { useRef, useState } from "react";
import { editor } from "monaco-editor";
import { Editor } from "@monaco-editor/react";
import { getFileObject, readFile } from "@/libs";

interface MonacoEditorReactProps {
  id: string;
  active: boolean;
}

export const MonacoEditorReact = ({ id, active }: MonacoEditorReactProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
    updateEditorContent(id);
  };

  const updateEditorContent = async (id: string) => {
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
    setLanguage(lang);
    setValue(content);
  };

  if (!active) return;

  return (
    <main className="w-full overflow-y-auto h-[calc(100vh-40px)]">
      <Editor
        className="h-full"
        height="100vh"
        options={{
          minimap: {
            enabled: true,
          },
        }}
        theme="vs-dark"
        language={language}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value as string)}
      />
    </main>
  );
};