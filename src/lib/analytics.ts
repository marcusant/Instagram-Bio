import { track } from "@vercel/analytics";

/** Analytics event names kept in one place to avoid typos. */
export const AnalyticsEvent = {
  LinkClick: "link_click",
  SocialClick: "social_click",
  SubscribeSubmit: "subscribe_submit",
  SubscribeSuccess: "subscribe_success",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

/**
 * Thin wrapper over Vercel Analytics `track`. No-ops safely when analytics is
 * unavailable (SSR, blocked, or dev without the script) so callers never throw.
 */
export function trackEvent(
  name: AnalyticsEventName,
  data?: Record<string, string | number | boolean | null>,
): void {
  try {
    track(name, data);
  } catch {
    // Analytics must never break a navigation or a form submit.
  }
}
