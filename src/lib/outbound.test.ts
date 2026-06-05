import { describe, it, expect } from "vitest";
import { withUtm } from "./outbound";

describe("withUtm", () => {
  it("appends utm params to an http(s) url", () => {
    const out = withUtm("https://example.com/page", "youtube");
    const url = new URL(out);
    expect(url.searchParams.get("utm_source")).toBe("bio");
    expect(url.searchParams.get("utm_medium")).toBe("link_in_bio");
    expect(url.searchParams.get("utm_campaign")).toBe("youtube");
  });

  it("preserves existing query params", () => {
    const out = withUtm("https://example.com/?cupom=MARCUSANTOS", "cupom");
    const url = new URL(out);
    expect(url.searchParams.get("cupom")).toBe("MARCUSANTOS");
    expect(url.searchParams.get("utm_campaign")).toBe("cupom");
  });

  it("leaves mailto and tel links untouched", () => {
    expect(withUtm("mailto:a@b.com", "x")).toBe("mailto:a@b.com");
    expect(withUtm("tel:+5511999999999", "x")).toBe("tel:+5511999999999");
  });

  it("returns relative/invalid urls unchanged", () => {
    expect(withUtm("/local", "x")).toBe("/local");
  });
});
