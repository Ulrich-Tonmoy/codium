import { memo } from "react";
import {
  BellDotIcon,
  BracketErrorIcon,
  CheckAllIcon,
  CloudUploadIcon,
  RadioTowerIcon,
  RemoteIcon,
  SourceIcon,
} from "../icons";
import { useAppSelector } from "@/libs/hooks";
import { getFileTypes } from "@/libs/explorerBuilder";

export const Footer = memo((props: any) => {
  const editorIndent = useAppSelector((state) => state.main.indent);
  const activeFile = useAppSelector((state) => state.main.activeFile);

  return (
    <div className="footer-section">
      <div>
        <div className="remove-item">
          <RemoteIcon />
        </div>
        <div>
          <span className="bigger-icon" style={{ marginRight: 5 }}>
            <SourceIcon />
          </span>
          <span>main</span>
          <span className="bigger-icon" style={{ marginLeft: 5 }}>
            <CloudUploadIcon />
          </span>
        </div>
        <div className="">
          <span className="bigger-icon" style={{ marginRight: 5 }}>
            <RadioTowerIcon />
          </span>
          <div>0</div>
        </div>
      </div>
      <div>
        <div className="">
          <div>
            Ln {editorIndent.line}, Col {editorIndent.column}
          </div>
        </div>
        <div className="">
          <div>Spaces: 4</div>
        </div>
        <div className="">
          <div>UTF-8</div>
        </div>
        <div className="">
          <div>LF</div>
        </div>
        <div className="">
          <span className="bigger-icon" style={{ marginRight: 5 }}>
            <BracketErrorIcon />
          </span>
          <div style={{ textTransform: "capitalize" }}>
            {activeFile == undefined ? "" : getFileTypes(activeFile.name)}
          </div>
        </div>
        <div className="">
          <span className="bigger-icon" style={{ marginRight: 5 }}>
            <CheckAllIcon />
          </span>
          <div>Prettier</div>
        </div>
        <div className="">
          <span className="bigger-icon" style={{ marginRight: 5 }}>
            <BellDotIcon />
          </span>
        </div>
      </div>
    </div>
  );
});
