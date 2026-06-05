"use client";

import type { SocialLink } from "@/types/site";
import { Icon } from "@/components/icons";
import { externalLinkProps } from "@/lib/outbound";
import { trackEvent, AnalyticsEvent } from "@/lib/analytics";

/** Row of social icon links below the profile. */
export function SocialBar({ socials }: { socials: SocialLink[] }) {
  if (socials.length === 0) return null;

  return (
    <nav aria-label="Redes sociais" className="reveal reveal-3 mt-5">
      <ul className="flex items-center justify-center gap-3">
        {socials.map((social) => (
          <li key={social.platform}>
            <a
              href={social.href}
              {...externalLinkProps}
              aria-label={social.label}
              onClick={() =>
                trackEvent(AnalyticsEvent.SocialClick, { platform: social.platform })
              }
              className="social-button"
            >
              <Icon name={social.platform} width={20} height={20} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
