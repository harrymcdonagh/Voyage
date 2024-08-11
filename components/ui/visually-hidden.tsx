import { ReactNode } from "react";
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        position: "absolute",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        height: 1,
        width: 1,
        margin: -1,
      }}
    >
      {children}
    </span>
  );
}
