/**
 * Helpers for outbound links: attach UTM params so destinations can attribute
 * traffic back to the bio page, and expose safe rel/target defaults.
 */

const DEFAULT_UTM = {
  utm_source: "bio",
  utm_medium: "link_in_bio",
} as const;

/** Hosts where we should NOT inject query params (deep links / app schemes). */
const SKIP_UTM_PROTOCOLS = ["mailto:", "tel:", "whatsapp:"];

/**
 * Returns the href with UTM params appended when it's a normal http(s) URL.
 * Leaves mailto:, tel:, wa.me deep links and malformed URLs untouched.
 */
export function withUtm(href: string, campaign: string): string {
  try {
    const url = new URL(href);
    if (SKIP_UTM_PROTOCOLS.includes(url.protocol)) return href;

    url.searchParams.set("utm_source", DEFAULT_UTM.utm_source);
    url.searchParams.set("utm_medium", DEFAULT_UTM.utm_medium);
    url.searchParams.set("utm_campaign", campaign);
    return url.toString();
  } catch {
    // Relative or invalid URL — return as-is rather than throwing.
    return href;
  }
}

/** Safe defaults for external anchors. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
