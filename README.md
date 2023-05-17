<div id="vscodium-logo" align="center">
    <br />
    <img src="./app-icons/png/green/nobg_jared18.png" alt="Codium Logo" width="200"/>
    <h1>Codium</h1>
    <h3></h3>
</div>

<div id="vscodium-logo" align="center">
    <img src="./docs/codium.png" alt="Codium" width="330"/>
    <img src="./docs/core.png" alt="Code flow" width="330"/>
</div>

### 0.0.1:

- [x] Reading files and folders that contains in a directory
- [x] Creating new file
- [x] Editing file content
- [x] Multiple tabs
- [x] Showing folder structure
- [x] File icons

### 0.0.2:

- [x] Create new folder and toggle folder open close icon
- [x] Only show the Project Name instead of the whole path
- [x] Project Open and ProjectName moved from Explorer to TitleBar
- [x] Create new folder and file autofocus the input field
- [x] Delete file and folder
- [x] Context Menu
- [x] Fixed Image view

### 0.0.3:

- [x] Migrated to Redux Toolkit

ToDo:

- [ ] Add Unsaved File alert
- [ ] Fix context menu
- [ ] Add Terminal
- [ ] Add Search
- [ ] Add Git

## Recommended Setup To Work in Windows

- [Desktop development with c++](https://learn.microsoft.com/en-us/cpp/build/vscpp-step-0-installation?view=msvc-170) + [Rust](https://www.rust-lang.org/tools/install)
- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## To Run

```properties
npm i
npm run tauri dev
```

## To Build

```properties
npm run tauri build
```
