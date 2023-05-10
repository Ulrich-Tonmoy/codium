import { nanoid } from "nanoid";
import { useEffect, useMemo, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { getFileObject } from "../stores/file";
import { readFile, writeFile } from "../helpers/fileSys";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { rust } from "@codemirror/lang-rust";
import { python } from "@codemirror/lang-python";
import { materialDark } from "cm6-theme-material-dark";

interface Props {
  id: string;
  active: boolean;
}

const CodeEditor = ({ id, active }: Props) => {
  const isRendered = useRef(0);
  const editorId = useMemo(() => nanoid(), []);
  const visible = active ? "" : "hidden";
  const editorRef = useRef<EditorView | null>(null);

  const fillContentInEditor = (content: string) => {
    const element = document.getElementById(editorId);

    if (element && isRendered.current === 0) {
      isRendered.current = 1;
      editorRef.current = new EditorView({
        doc: content,
        extensions: [
          basicSetup,
          javascript(),
          markdown(),
          html(),
          css(),
          json(),
          rust(),
          python(),
          materialDark,
        ],
        parent: element,
      });
    }
  };

  const updateEditorContent = async (id: string) => {
    const file = getFileObject(id);
    const content = await readFile(file.path);

    fillContentInEditor(content);
  };

  const onSave = async () => {
    if (!editorRef.current) return;

    const content = editorRef.current.state.doc.toString();
    const file = getFileObject(id);

    writeFile(file.path, content);
  };

  useEffect(() => {
    updateEditorContent(id);
  }, [id]);

  return (
    <main
      className={`w-full overflow-y-auto ${visible}`}
      style={{ height: "calc(100vh - 40px)" }}
    >
      <div
        id={editorId}
        tabIndex={-1}
        onKeyUp={(e) => {
          if (e.ctrlKey && e.key === "s") {
            e.preventDefault();
            e.stopPropagation();
            onSave();
          }
        }}
      ></div>
    </main>
  );
};

export default CodeEditor;
