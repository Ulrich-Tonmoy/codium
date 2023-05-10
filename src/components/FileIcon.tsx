import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/js.png";
import ts from "../assets/ts.png";
import json from "../assets/json.png";
import react from "../assets/react.png";
import git from "../assets/git.png";
import md from "../assets/md.png";
import rust from "../assets/rust.png";
import go from "../assets/go.png";
import csharp from "../assets/csharp.png";
import python from "../assets/python.png";
import node from "../assets/node.png";
import postcss from "../assets/postcss.png";
import tailwind from "../assets/tailwind.png";
import vite from "../assets/vite.png";
import ps from "../assets/ps.png";
import image from "../assets/image.svg";

interface Icons {
  [key: string]: string;
}

const icons: Icons = {
  html,
  css,
  js,
  ts,
  json,
  tsx: react,
  jsx: react,
  gitignore: git,
  md,
  rs: rust,
  go: go,
  cs: csharp,
  py: python,
  package: node,
  lock: node,
  postcss,
  tailwind,
  vite,
  svg: image,
  png: image,
  icns: image,
  ico: image,
  gif: image,
  jpeg: image,
  jpg: image,
  tiff: image,
  bmp: image,
};

interface IFileIconProps {
  name: string;
  size?: "sm" | "base";
}

const getExtension = (name: string): string => {
  if (name.startsWith("package")) return "package";
  else if (name.startsWith("postcss")) return "postcss";
  else if (name.startsWith("tailwind")) return "tailwind";
  else if (name.startsWith("vite")) return "vite";
  else {
    const lastDotIndex = name.lastIndexOf(".");
    return lastDotIndex !== -1
      ? name.slice(lastDotIndex + 1).toLowerCase()
      : "NONE";
  }
};

const FileIcon = ({ name, size = "base" }: IFileIconProps) => {
  const ext = getExtension(name);
  const cls = size === "base" ? "w-4" : "w-3";

  if (icons[ext]) {
    return <img className={cls} src={icons[ext]} alt={name} />;
  }

  return <img className={cls} src={ps} alt={name} />;
};

export default FileIcon;
