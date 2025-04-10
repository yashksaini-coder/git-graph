import React, { useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FaBorderStyle } from "react-icons/fa";
import { MdCenterFocusWeak } from "react-icons/md";
import { AiOutlineFontSize } from "react-icons/ai";
import ThemesPanel from "@/components/shared/ThemesPanel";
import HidePanel from "./shared/HidePanel";
import BlockPanel from "./shared/BlockPanel";
import FontPanel from "./shared/FontPanel";

const ExportPanel = ({
  onExport,
  setTheme,
  hideColorLegend,
  sethideColorLegend,
  hideMonthLabels,
  sethideMonthLabels,
  hideTotalCount,
  sethideTotalCount,
  blockMargin,
  setBlockMargin,
  blockRadius,
  setBlockRadius,
  blockSize,
  setBlockSize,
  fontSize,
  setFontSize,
}: {
  onExport: () => void;
  setTheme: (theme: any) => void;
  hideColorLegend: boolean;
  sethideColorLegend: (value: boolean) => void;
  hideMonthLabels: boolean;
  sethideMonthLabels: (value: boolean) => void;
  hideTotalCount: boolean;
  sethideTotalCount: (value: boolean) => void;
  blockMargin: number;
  setBlockMargin: (value: number) => void;
  blockRadius: number;
  setBlockRadius: (value: number) => void;
  blockSize: number;
  setBlockSize: (value: number) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
}) => {
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const togglePopover = (popoverName: string) => {
    setActivePopover((prev) => (prev === popoverName ? null : popoverName));
  };

  return (
    <div className="relative flex items-center justify-center gap-5 bg-gray-800 p-4 rounded-full shadow-md">
      {/* IoColorPaletteOutline Button */}
      <button
        onClick={() => togglePopover("theme")}
        className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full hover:bg-gray-600 transition"
      >
        <IoColorPaletteOutline className="text-white text-lg" />
      </button>
      {activePopover === "theme" && (
        <div className="absolute top-[-255px] right-[20%] transform -translate-x-1/2 bg-gray-900 p-4 rounded-xl shadow-lg z-50 backdrop-blur ">
          <ThemesPanel setTheme={setTheme} />
        </div>
      )}

      {/* FaBorderStyle Button */}
      <button
        onClick={() => togglePopover("blockStyle")}
        className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-xl hover:bg-gray-600 transition"
      >
        <FaBorderStyle className="text-white text-lg" />
      </button>
      {activePopover === "blockStyle" && (
        <div className="absolute top-[-288px] left-1/2 transform -translate-x-1/2 bg-gray-900 p-4 rounded-xl shadow-lg z-50">
          <BlockPanel
            blockMargin={blockMargin}
            setBlockMargin={setBlockMargin}
            blockRadius={blockRadius}
            setBlockRadius={setBlockRadius}
            blockSize={blockSize}
            setBlockSize={setBlockSize}
          />
        </div>
      )}

      {/* MdCenterFocusWeak Button */}
      <button
        onClick={() => togglePopover("hide")}
        className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-xl hover:bg-gray-600 transition"
      >
        <MdCenterFocusWeak className="text-white text-lg" />
      </button>
      {activePopover === "hide" && (
        <div className="absolute top-[-302px] left-[70%] transform -translate-x-1/2 bg-gray-900 p-4 rounded-xl shadow-lg z-50">
          <HidePanel
            hideColorLegend={hideColorLegend}
            sethideColorLegend={sethideColorLegend}
            hideMonthLabels={hideMonthLabels}
            sethideMonthLabels={sethideMonthLabels}
            hideTotalCount={hideTotalCount}
            sethideTotalCount={sethideTotalCount}
          />
        </div>
      )}

      {/* AiOutlineFontSize Button */}
      <button
        onClick={() => togglePopover("font")}
        className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-xl hover:bg-gray-600 transition"
      >
        <AiOutlineFontSize className="text-white text-lg" />
      </button>
      {activePopover === "font" && (
        <div className="absolute top-[-184px] left-[130%] transform -translate-x-1/2 bg-gray-900 p-4 rounded-xl shadow-lg z-50">
          <FontPanel fontSize={fontSize} setFontSize={setFontSize} />
        </div>
      )}
    </div>
  );
};

export default ExportPanel;
