import type { ReactNode } from "react";

/** Centered, width-constrained column used by every section of the page. */
export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[30rem] px-5 sm:px-6">{children}</div>
  );
}
