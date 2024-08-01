import { useLoadcodeMutation } from "@/Redux/slices/api";
import { updateFullCode } from "@/Redux/slices/CompilerSlice";
import CodeEditor from "@/Shadecn/components/CodeEditor";
import HelperHeader from "@/Shadecn/components/HelperHeader";
import Loader from "@/Shadecn/components/Loader/Loader";
import RenderCode from "@/Shadecn/components/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/Shadecn/components/ui/resizable";
import { handleError } from "@/utils/handleError";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Compiler() {
  const { urlId } = useParams();
  const [loadExistingCode, { isLoading }] = useLoadcodeMutation();
  const Dispatch = useDispatch();

  const loadCode = async () => {
    try {
      if (urlId) {
        const response = await loadExistingCode({ urlId }).unwrap();
        Dispatch(updateFullCode(response.fullCode));
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

  if (isLoading)
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <ResizablePanelGroup direction="horizontal" className="">
      <ResizablePanel defaultSize={50} className="h-[calc(100vh-60px)]">
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={50}
        className="h-[calc(100vh-60px)] min-w-[350px]"
      >
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
