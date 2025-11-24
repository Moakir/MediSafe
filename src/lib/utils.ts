import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// 新粗野主义风格的工具类
export const brutalStyle = {
  borderThin: "border-2 border-black",
  borderThick: "border-[3px] border-black",
  radius: "rounded-[2px]",
  shadowSm: "shadow-[3px_3px_0_0_#000]",
  shadowMd: "shadow-[6px_6px_0_0_#000]",
  shadowLg: "shadow-[10px_10px_0_0_#000]",
  focus: "focus:outline-none focus:ring-0 focus-visible:border-4 focus-visible:border-black",
  // 颜色
  accentYellow: "#FFE066",
  accentBlue: "#67E8F9",
  accentGreen: "#86EFAC",
  danger: "#F87171",
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
