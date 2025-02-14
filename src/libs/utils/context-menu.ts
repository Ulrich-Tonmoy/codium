import {
  CheckMenuItemOptions,
  Menu,
  MenuItemOptions,
  PredefinedMenuItemOptions,
} from "@tauri-apps/api/menu";
import { createFile, getFolderTree } from "./fs-utils";
import { store } from "../redux-toolkit/store";
import { setFolderStructure } from "../redux-toolkit/editorSlice";

export const getContextMenu = (folder = true, fullPath = "") => {
  const folderItems: (
    | MenuItemOptions
    | CheckMenuItemOptions
    | PredefinedMenuItemOptions
  )[] = [
    {
      id: "open_folder",
      text: "Open Folder",
      action: async () => {
        const folder = await getFolderTree();
        folder.name && store.dispatch(setFolderStructure(folder));
        window.location.reload();
      },
    },
    {
      item: "Separator",
    },
    {
      id: "new_file",
      text: "New File",
      action: () => {
        const newFileItem = document.createElement("div");
        newFileItem.className = "content-item new-file-item";
        newFileItem.innerHTML = `
          <div>
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#d2d4d3"> <path d="M1.75 3a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75zM1.75 6a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zM1 9.75A.75.75 0 011.75 9h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 9.75zM1.75 12a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z"></path> </g> </g></svg>
          </div>
          <div class="file-name" contenteditable="true"></div>
      `;
        setTimeout(() => {
          (newFileItem.querySelector(".file-name") as HTMLElement).focus();
        }, 0);
        (newFileItem.querySelector(".file-name") as HTMLElement).onkeyup = async (e) => {
          try {
            if (e.key.toLowerCase() == "enter") {
              const targetEditableEl = e.currentTarget as HTMLElement;
              const value = targetEditableEl.innerText;

              if (value != "") {
                await createFile(fullPath + "/" + value);
                // TODO: reread the tree /Fix after adding a new file show it in the explorer immediately
                // const updatedTree = store
                //   .getState()
                //   .main.folderStructure.tree.map((item) =>
                //     item.path == fullPath
                //       ? {
                //           ...item,
                //           children: [
                //             ...item.children,
                //             {
                //               name: value,
                //               path: fullPath + "/" + value,
                //               isDirectory: false,
                //               children: [],
                //             },
                //           ],
                //         }
                //       : item,
                //   );

                // console.log("🚀 ~ updatedTree:", updatedTree);
                // store.dispatch(
                //   setFolderStructure({
                //     ...store.getState().main.folderStructure,
                //     tree: updatedTree,
                //   }),
                // );
              }
              newFileItem?.remove();
            }
          } catch (error) {}
        };
        (newFileItem.querySelector(".file-name") as HTMLElement).onblur = async (e) => {
          const targetEditableEl = e.currentTarget as HTMLElement;
          const value = targetEditableEl.innerText;

          if (value != "") {
            await createFile(fullPath + "/" + value);

            // TODO: re fetch the file tree with new file name
            // TODO: reread the tree /Fix after adding a new file show it in the explorer immediately
            store.dispatch(
              setFolderStructure({
                ...store.getState().main.folderStructure,
                tree: [
                  ...store.getState().main.folderStructure.tree,
                  {
                    name: value,
                    path: fullPath + "/" + value,
                    isDirectory: false,
                    children: [],
                  },
                ],
              }),
            );
          }
          newFileItem.remove();
        };

        const targetEl = document
          .querySelector(`#list-wrapper-${fullPath.replace(/[\/\\.:]/g, "-")}`)!
          .querySelector(".content-list")!;
        targetEl.prepend(newFileItem);
      },
    },
    {
      id: "new_folder",
      text: "New Folder",
      action: () => console.log("Option 1"),
    },
    {
      id: "reveal_in_file_explorer",
      text: "Reveal in File Explorer",
    },
    {
      id: "open_in_integrated_terminal",
      text: "Open in Integrated Terminal",
    },
    {
      item: "Separator",
    },
    {
      id: "find_in_folder",
      text: "Find in Folder",
    },
    {
      item: "Separator",
    },
    {
      item: "Cut",
    },
    {
      item: "Copy",
    },
    {
      item: "Paste",
    },
    {
      item: "Separator",
    },
    {
      id: "copy_path",
      text: "Copy Path",
    },
    {
      id: "copy_relative_path",
      text: "Copy Relative Path",
    },
    {
      item: "Separator",
    },
    {
      id: "rename",
      text: "Rename",
      accelerator: "F2",
      action: () => console.log("Option 1"),
    },
    {
      id: "delete",
      text: "Delete",
      accelerator: "Delete",
      action: () => console.log("Option 1"),
    },
  ];
  const fileItems: (
    | MenuItemOptions
    | CheckMenuItemOptions
    | PredefinedMenuItemOptions
  )[] = [
    {
      id: "open_to_the_side",
      text: "Open to the Side",
      action: () => console.log("Option 1"),
    },
    {
      id: "open_with",
      text: "Open With",
      action: () => console.log("Option 1"),
    },
    {
      id: "reveal_in_file_explorer",
      text: "Reveal in File Explorer",
    },
    {
      id: "open_in_integrated_terminal",
      text: "Open in Integrated Terminal",
    },
    {
      item: "Separator",
    },
    {
      id: "select_for_compare",
      text: "Select for Compare",
    },
    {
      item: "Separator",
    },
    {
      id: "find_in_folder",
      text: "Find in Folder",
    },
    {
      item: "Separator",
    },
    {
      id: "open_timeline",
      text: "Open Timeline",
    },
    {
      item: "Separator",
    },
    {
      item: "Cut",
    },
    {
      item: "Copy",
    },
    {
      item: "Separator",
    },
    {
      id: "copy_path",
      text: "Copy Path",
    },
    {
      id: "copy_relative_path",
      text: "Copy Relative Path",
    },
    {
      item: "Separator",
    },
    {
      id: "rename",
      text: "Rename",
      accelerator: "F2",
      action: () => console.log("Option 1"),
    },
    {
      id: "delete",
      text: "Delete",
      accelerator: "Delete",
      action: () => console.log("Option 1"),
    },
  ];
  return Menu.new({
    items: folder ? folderItems : fileItems,
  });
};

// Examples
// items: [
//   {
//     item: "Separator",
//   },
//   {
//     item: "Copy",
//   },
//   {
//     item: "Cut",
//   },
//   {
//     item: "Paste",
//   },
//   {
//     item: "SelectAll",
//   },
//   {
//     item: "Undo",
//   },
//   {
//     item: "Redo",
//   },
//   {
//     item: "Minimize",
//   },
//   {
//     item: "Maximize",
//   },
//   {
//     item: "Fullscreen",
//   },
//   {
//     item: "Hide",
//   },
//   {
//     item: "HideOthers",
//   },
//   {
//     item: "ShowAll",
//   },
//   {
//     item: "CloseWindow",
//   },
//   {
//     item: "Quit",
//   },
//   {
//     item: "Services",
//   },
//   {
//     id: "ctx_option1",
//     text: "Option 1",
//     accelerator: "Ctrl+A",
//     action: () => console.log("Option 1"),
//   },
//   {
//     id: "ctx_option2",
//     text: "Option 2",
//     action: () => console.log("Option 2"),
//     items: [
//       {
//         id: "ctx_option2",
//         text: "Option 2",
//         action: () => console.log("Option 2"),
//       },
//     ],
//   },
// ];
