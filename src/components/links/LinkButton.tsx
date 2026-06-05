"use client";

import type { BioLink } from "@/types/site";
import { Icon } from "@/components/icons";
import { withUtm, externalLinkProps } from "@/lib/outbound";
import { trackEvent, AnalyticsEvent } from "@/lib/analytics";

interface LinkButtonProps {
  link: BioLink;
  index: number;
}

/**
 * A single link button. The lavender accent wash fades in on hover/focus and
 * fades back out on leave. Hover/focus/active states are all explicitly designed.
 */
export function LinkButton({ link, index }: LinkButtonProps) {
  const href = withUtm(link.href, link.id);

  return (
    <a
      href={href}
      {...externalLinkProps}
      onClick={() =>
        trackEvent(AnalyticsEvent.LinkClick, { id: link.id, featured: !!link.featured })
      }
      style={{ ["--i" as string]: index }}
      className="link-button group reveal"
    >
      <span className="link-button__icon" aria-hidden>
        <Icon name={link.icon ?? "link"} width={22} height={22} />
      </span>

      <span className="link-button__body">
        <span className="link-button__label">{link.label}</span>
        {link.subtitle && (
          <span className="link-button__subtitle">{link.subtitle}</span>
        )}
      </span>

      <span className="link-button__chevron" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}
