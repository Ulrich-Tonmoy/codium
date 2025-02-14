import {
  BinaryIcon,
  CIcon,
  CppIcon,
  CsIcon,
  CssIcon,
  EslintIcon,
  GitIcon,
  HtmlIcon,
  ImageIcon,
  JavaScriptIcon,
  ReactIcon,
  JsonIcon,
  LuaIcon,
  MarkdownIcon,
  NextIcon,
  NimIcon,
  NodeIcon,
  PdfIcon,
  PostcssIcon,
  PythonIcon,
  RazorIcon,
  ReadmeIcon,
  RustIcon,
  SassIcon,
  SlnIcon,
  TailwindIcon,
  TsconfigIcon,
  TtfIcon,
  TypescriptIcon,
  TsDefIcon,
  SvgIcon,
  UnknownIcon,
  ViteIcon,
  XmlIcon,
  YamlIcon,
  ZigIcon,
} from "@/assets/";

interface Icons {
  [key: string]: React.ReactElement;
}

const typeIcon: Icons = {
  bin: <BinaryIcon />,
  c: <CIcon />,
  cpp: <CppIcon />,
  cs: <CsIcon />,
  css: <CssIcon />,
  eslint: <EslintIcon />,
  gitignore: <GitIcon />,
  html: <HtmlIcon />,
  png: <ImageIcon />,
  jpeg: <ImageIcon />,
  jpg: <ImageIcon />,
  js: <JavaScriptIcon />,
  jsx: <ReactIcon />,
  json: <JsonIcon />,
  lua: <LuaIcon />,
  md: <MarkdownIcon />,
  next: <NextIcon />,
  nim: <NimIcon />,
  node: <NodeIcon />,
  pdf: <PdfIcon />,
  postcss: <PostcssIcon />,
  py: <PythonIcon />,
  razor: <RazorIcon />,
  readme: <ReadmeIcon />,
  rs: <RustIcon />,
  sass: <SassIcon />,
  sln: <SlnIcon />,
  tailwind: <TailwindIcon />,
  tsconfig: <TsconfigIcon />,
  ttf: <TtfIcon />,
  ts: <TypescriptIcon />,
  tsx: <ReactIcon />,
  tsDef: <TsDefIcon />,
  svg: <SvgIcon />,
  unknown: <UnknownIcon />,
  vite: <ViteIcon />,
  xml: <XmlIcon />,
  yaml: <YamlIcon />,
  zig: <ZigIcon />,
};

const getExtension = (name: string): string => {
  if (name.toLowerCase().startsWith("package")) return "node";
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
    return lastDotIndex !== -1 ? name.slice(lastDotIndex + 1).toLowerCase() : "NONE";
  }
};

const FileIcon = ({ name }: { name: string }) => {
  const ext = getExtension(name);

  return typeIcon[ext] ?? typeIcon["unknown"];
};

export default FileIcon;
