import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { tags as t } from "@lezer/highlight";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { updateCodeValue } from "@/Redux/slices/CompilerSlice";

export default function CodeEditor() {
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );

  const fullcode = useSelector((state: RootState) => state.compilerSlice.fullCode);

  const Dispatch = useDispatch();

  const onChange = React.useCallback((value: string) => {
    Dispatch(updateCodeValue(value));
  }, []);

  return (
    <ReactCodeMirror
      value={fullcode[currentLanguage]}
      height="calc(100vh - 60px - 50px)"
      className="code-editor [&>.cm-editor]:!text-[10px] md:[&>.cm-editor]:!text-xs"
      extensions={[loadLanguage(currentLanguage)!]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
}
