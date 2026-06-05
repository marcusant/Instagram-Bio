/**
 * Typed data model for the link-in-bio.
 *
 * `src/config/site.ts` is the single source of truth. To add or change a link,
 * edit that file — never the components.
 */

export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "whatsapp"
  | "x"
  | "linkedin"
  | "facebook"
  | "email"
  | "website";

/** Icon key rendered by the icon registry (`src/components/icons`). */
export type IconKey = SocialPlatform | "link" | "tag" | "play";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  /** Accessible label, e.g. "Instagram de Marcus". */
  label: string;
}

export interface BioLink {
  /** Stable id used as React key and analytics event label. */
  id: string;
  label: string;
  href: string;
  /** Optional second line under the label (e.g. coupon hint). */
  subtitle?: string;
  /** Icon shown on the left of the button. */
  icon?: IconKey;
  /** Visually highlights the button (used for the coupon CTA). */
  featured?: boolean;
  /** Set to false to hide without deleting. Defaults to true. */
  enabled?: boolean;
}

export interface ProfileConfig {
  name: string;
  /** Handle without the leading @. */
  handle: string;
  /** Path under /public, e.g. "/avatar.jpg". */
  avatar: string;
  bio: string;
  verified?: boolean;
}

export interface SubscribeConfig {
  enabled: boolean;
  title: string;
  description: string;
  buttonLabel: string;
  successMessage: string;
}

export interface ThemeConfig {
  /** Default color scheme on first visit. */
  defaultMode: "dark" | "light";
  /** Whether to render the light/dark toggle. */
  allowToggle: boolean;
}

export interface SeoConfig {
  title: string;
  description: string;
  /** Canonical absolute URL (no trailing slash). */
  url: string;
}

export interface SiteConfig {
  profile: ProfileConfig;
  socials: SocialLink[];
  links: BioLink[];
  subscribe: SubscribeConfig;
  theme: ThemeConfig;
  seo: SeoConfig;
}
