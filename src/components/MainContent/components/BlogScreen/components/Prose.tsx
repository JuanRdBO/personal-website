import clsx from "clsx";
import React from "react";

export default function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx(className, " dark:prose-invert")}>{children}</div>;
}
