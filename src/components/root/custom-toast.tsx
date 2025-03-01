import React from "react";
import { cva } from "class-variance-authority";
import { Handjet, Share_Tech } from "next/font/google";
import MarqueeContainer from "@/components/common/marquee-container";
import { toast } from "sonner";
import { X } from "lucide-react";

const handjet = Handjet({ subsets: ["latin"] });
const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface Props {
  variant?: "success" | "info" | "warning" | "error";
  children: React.ReactNode;
  metadata?: number | string;
}

const toastStyles = cva(
  [
    "relative sm:w-80 bg-neutral-900 border-2 p-0 shadow-2xl shadow-neutral-900",
    sharetech.className,
    "tracking-tight",
  ],
  {
    variants: {
      intent: {
        success: ["border-green-300"],
        info: ["border-blue-300"],
        warning: ["border-yellow-200"],
        error: ["border-red-300"],
      },
    },
    defaultVariants: {
      intent: "info",
    },
  },
);

const CustomToast = ({ variant, children, metadata }: Props) => {
  return (
    <div className={toastStyles({ intent: variant })}>
      <div
        className={`relative h-10 w-full border-b-2 text-xl font-light uppercase tracking-widest ${handjet.className} flex flex-col justify-center overflow-clip ${
          variant === "info"
            ? "border-blue-300 text-blue-300"
            : variant === "success"
              ? "border-green-300 text-green-300"
              : variant === "warning"
                ? "border-yellow-200 text-yellow-200"
                : variant === "error"
                  ? "border-red-300 text-red-300"
                  : "border-amber-50 text-amber-50"
        }`}
      >
        <MarqueeContainer
          text={
            variant === "info"
              ? ["important information", "may I have your attention please"]
              : variant === "success"
                ? ["mission accomplished", "yay that's a win"]
                : variant === "warning"
                  ? ["easy there lad", "you have been warned"]
                  : variant === "error"
                    ? ["critical error", "you messed up"]
                    : ["oh noes", "well maybe we messed up"]
          }
        />
      </div>
      <div className="p-2.5 text-amber-50">{children ?? "Generic toast"}</div>
      {metadata && (
        <div className="flex w-full justify-end">
          <div
            className={`flex cursor-pointer items-center justify-center p-1 ${
              variant === "info"
                ? "text-blue-300"
                : variant === "success"
                  ? "text-green-300"
                  : variant === "warning"
                    ? "text-yellow-200"
                    : variant === "error"
                      ? "text-red-300"
                      : "text-amber-50"
            }`}
            onClick={() => toast.dismiss(metadata)}
          >
            <X />
          </div>
        </div>
      )}
      <div className="staticBg"></div>
    </div>
  );
};

export default CustomToast;
