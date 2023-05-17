import { icons } from "../utils/iconsData";

interface IFileIconProps {
  name: string;
  size?: "sm" | "base";
}

const getExtension = (name: string): string => {
  if (name.toLowerCase().startsWith("package")) return "package";
  else if (name.toLowerCase().startsWith("postcss")) return "postcss";
  else if (name.toLowerCase().startsWith("tailwind")) return "tailwind";
  else if (name.toLowerCase().startsWith("vite")) return "vite";
  else if (name.toLowerCase().startsWith("readme")) return "readme";
  else if (name.toLowerCase().startsWith("favicon")) return "favicon";
  else if (name.toLowerCase().startsWith("tsconfig")) return "tsconfig";
  else if (name.toLowerCase().startsWith(".eslintrc")) return "eslint";
  else if (name.toLowerCase().startsWith("next")) return "next";
  else if (name.includes(".d.")) return "tsdef";
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

  return <img className={cls} src={icons["file"]} alt={name} />;
};

export default FileIcon;
