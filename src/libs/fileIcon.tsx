import {
  GitIcon,
  HTMLIcon,
  CSSIcon,
  JSIcon,
  JSONIcon,
  MarkdownIcon,
  TSIcon1,
  TSIcon2,
  TTFIcon,
  SVGIcon,
  UnknownIcon,
} from "@/components/icons";

const FileIcon = ({ type }: { type: string }) => {
  const typeIcon = {
    gitignore: <GitIcon />,
    html: <HTMLIcon />,
    css: <CSSIcon />,
    js: <JSIcon />,
    jsx: <JSIcon />,
    json: <JSONIcon />,
    md: <MarkdownIcon />,
    ts: <TSIcon1 />,
    tsx: <TSIcon2 />,
    ttf: <TTFIcon />,
    svg: <SVGIcon />,
    unknown: <UnknownIcon />,
  };

  return typeIcon[type as keyof typeof typeIcon] || typeIcon["unknown"];
};

export default FileIcon;
