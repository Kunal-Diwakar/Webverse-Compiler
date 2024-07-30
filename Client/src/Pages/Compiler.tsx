import { updateFullCode } from "@/Redux/slices/CompilerSlice";
import CodeEditor from "@/Shadecn/components/CodeEditor";
import HelperHeader from "@/Shadecn/components/HelperHeader";
import RenderCode from "@/Shadecn/components/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/Shadecn/components/ui/resizable";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Compiler() {
  const { urlId } = useParams();
  const Dispatch = useDispatch();

  const loadCode = async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/load", {
        urlId: urlId,
      });
      Dispatch(updateFullCode(response.data.fullCode));
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error?.response?.status === 500) {
          toast("Invalid URL, Defult Page Loaded !")
        }
      }
      handleError(error);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

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
