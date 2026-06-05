import type { BioLink } from "@/types/site";
import { LinkButton } from "./LinkButton";

/** Vertical stack of link buttons with staggered reveal. */
export function LinkList({ links }: { links: BioLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="mt-8 flex flex-col gap-3.5">
      {links.map((link, index) => (
        <LinkButton key={link.id} link={link} index={index} />
      ))}
    </div>
  );
}
