// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open_folder(folder_path: &str) -> String {
    let files = file::read_directory(folder_path);
    files
}

#[tauri::command]
fn get_file_content(file_path: &str) -> String {
    let content = file::read_file(file_path);
    content
}

#[tauri::command]
fn write_file(file_path: &str, content: &str) -> String {
    file::write_file(file_path, content);
    String::from("OK")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, open_folder, get_file_content, write_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
