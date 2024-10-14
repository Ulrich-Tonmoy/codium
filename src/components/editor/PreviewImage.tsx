import { useRef } from "react";
import { convertFileSrc } from "@tauri-apps/api/core";

interface Props {
  path: string;
  active: boolean;
}

export const PreviewImage = ({ path, active }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div className={`${active ? "" : "hidden"} p-8`}>
      <img ref={imgRef} src={convertFileSrc(path)} alt="image view" />
    </div>
  );
};
