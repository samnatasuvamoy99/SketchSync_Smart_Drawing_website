import { createLucideIcon } from "lucide-react";

export const TextFormat = createLucideIcon("TextFormat", [
  // A shape
  ["path", { d: "M4 20 L9 6 L14 20", key: "a1" }],
  ["line", { x1: "6", y1: "14", x2: "12", y2: "14", key: "a2" }],

  // right lines
  ["line", { x1: "16", y1: "8", x2: "22", y2: "8", key: "l1" }],
  ["line", { x1: "16", y1: "13", x2: "22", y2: "13", key: "l2" }],

  // bottom line
  ["line", { x1: "4", y1: "22", x2: "22", y2: "22", key: "l3" }],
]);