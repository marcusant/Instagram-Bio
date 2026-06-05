import { describe, it, expect } from "vitest";
import { site, activeLinks } from "./site";

describe("site config integrity", () => {
  it("has a profile with name, handle and avatar", () => {
    expect(site.profile.name).toBeTruthy();
    expect(site.profile.handle).toBeTruthy();
    expect(site.profile.avatar.startsWith("/")).toBe(true);
  });

  it("uses unique link ids", () => {
    const ids = site.links.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every link has a non-empty href", () => {
    for (const link of site.links) {
      expect(link.href.length).toBeGreaterThan(0);
    }
  });

  it("activeLinks excludes disabled links", () => {
    const disabledCount = site.links.filter((l) => l.enabled === false).length;
    expect(activeLinks.length).toBe(site.links.length - disabledCount);
  });

  it("seo url has no trailing slash", () => {
    expect(site.seo.url.endsWith("/")).toBe(false);
  });
});
