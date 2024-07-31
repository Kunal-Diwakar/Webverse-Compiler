import { Code, Copy, Loader, Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Shadecn/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Shadecn/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "@/Redux/slices/CompilerSlice";
import { RootState } from "@/Redux/store";
import { handleError } from "@/utils/handleError";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSaveCodeMutation } from "@/Redux/slices/api";

export default function HelperHeader() {
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saveCode, { isLoading }] = useSaveCodeMutation();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const handleSaveCode = async () => {
    try {
      const response = await saveCode(fullCode).unwrap();
      navigate(`/compiler/${response.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    }
  };

  const { urlId } = useParams();
  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);

  return (
    <div className="__helper_header h-[50px] bg-black p-2 flex justify-between items-center ">
      <div className="__button_container flex gap-2">
        <Button
          variant="success"
          className="px-3"
          onClick={handleSaveCode}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin" size={20} />
            </>
          ) : (
            <>
              <Save size={20} />
            </>
          )}
        </Button>
        {shareBtn && (
          <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-500 hover:bg-blue-600 h-9 py-2 px-3">
              <Share2 size={20} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex flex-col gap-1">
                <DialogTitle className="flex gap-2 justify-center items-center">
                  <Code size={20} strokeWidth={3} />
                  Save your Code !
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-3">
                  <div className="__url flex gap-2">
                    <input
                      type="text"
                      disabled
                      className="w-full p-2 rounded bg-slate-800 text-slate-400 select-none"
                      value={window.location.href}
                    />
                    <Button
                      variant="outline"
                      className="h-full"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          window.location.href
                        );
                        toast("URL Copied to your clipboard!");
                      }}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                  <p className="text-center text-slate-300 text-md">
                    Share this URL with your friends to collaborate.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="__tab_switcher">
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[140px] focus:ring-0 bg-gray-800">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JAVASCRIPT</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
