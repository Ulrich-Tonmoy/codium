import { IMainContext, TFolderTree } from "../types/types";
import { renderToStaticMarkup } from "react-dom/server";
import FileIcon from "./file-icon";
import { createContext } from "react";
import { getContextMenu } from "./context-menu";

export const MainContext = createContext({} as IMainContext);

export const getFileTypes = (fileName: string) => {
  const fileTypes = {
    ".gitignore": "ignore",
    ".js": "javascript",
    ".jsx": "javascript",
    ".ts": "typescript",
    ".tsx": "typescript",
    ".json": "json",
    ".html": "html",
    ".css": "css",
    ".scss": "scss",
    ".less": "less",
    ".py": "python",
    ".java": "java",
    ".cpp": "cpp",
    ".c": "c",
    ".cs": "csharp",
    ".go": "go",
    ".php": "php",
    ".rb": "ruby",
    ".swift": "swift",
    ".kotlin": "kotlin",
    ".dart": "dart",
    ".xml": "xml",
    ".yaml": "yaml",
    ".yml": "yaml",
    ".md": "markdown",
  };
  return fileTypes[
    Object.keys(fileTypes).filter((type) =>
      new RegExp(`${type}$`).test(fileName),
    )[0] as keyof typeof fileTypes
  ];
};

const organizeFolder = (tree: TFolderTree[]) => {
  return [...tree].sort((a, b) => {
    if (a.isDirectory !== b.isDirectory) {
      return Number(b.isDirectory) - Number(a.isDirectory);
    }
    return a.name.localeCompare(b.name);
  });
};

export const makeContentList = (
  targetEl: HTMLElement,
  tree: TFolderTree[],
  handleSetEditor: Function,
) => {
  if (tree == undefined) return;
  const sortedTree = organizeFolder(tree);
  sortedTree.map((branch) => {
    if (branch.isDirectory) {
      const wrapperCont = document.createElement("div");
      wrapperCont.className = "content-list-wrapper ";
      wrapperCont.id = "list-wrapper-" + branch.path.replace(/[\/\\.:]/g, "-");

      // const newFileItem = document.createElement("div");
      // newFileItem.className = "content-item new-file-item";
      // newFileItem.innerHTML = `
      //     <div>
      //         <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#d2d4d3"> <path d="M1.75 3a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75zM1.75 6a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zM1 9.75A.75.75 0 011.75 9h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 9.75zM1.75 12a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z"></path> </g> </g></svg>
      //     </div>
      //     <div class="file-name" contenteditable="true"></div>
      // `;

      const contentItem = document.createElement("div");
      contentItem.className = "content-item";
      contentItem.innerHTML = `
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619z" clip-rule="evenodd"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="m7.976 10.072l4.357-4.357l.62.618L8.284 11h-.618L3 6.333l.619-.618z" clip-rule="evenodd"/></svg>
                </div>
                <div class="file-name">${branch.name}</div>
            `;
      const contentList = document.createElement("div");
      contentList.className = "content-list";

      contentItem.oncontextmenu = async (_e) => {
        const menuPromise = getContextMenu(true, branch.path);
        const menu = await menuPromise;
        menu.popup();
      };

      contentItem.onclick = (_e) => {
        if (contentList.classList.contains("shown")) {
          contentItem.classList.remove("shown");
          contentList.classList.remove("shown");
          contentList.style.display = "none";
          return (contentList.innerHTML = "");
        } else {
          contentList.classList.add("shown");
          contentItem.classList.add("shown");
          contentList.style.display = "block";
        }
        makeContentList(contentList, branch.children, handleSetEditor);
      };
      // wrapperCont.appendChild(newFileItem);
      wrapperCont.appendChild(contentItem);
      wrapperCont.appendChild(contentList);
      targetEl.append(wrapperCont);
    } else {
      const contentItem = document.createElement("div");
      contentItem.className = "content-item";
      contentItem.onauxclick = async (_e) => {
        const menuPromise = getContextMenu(false);
        const menu = await menuPromise;
        menu.popup();
      };
      contentItem.innerHTML = `
                <div>${renderToStaticMarkup(FileIcon({ name: branch.name }))}</div>
                <div class="file-name">${branch.name}</div>
            `;
      contentItem.onclick = (_e) => handleSetEditor(branch.name, branch.path);
      targetEl.append(contentItem);
    }
  });
};
