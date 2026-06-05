import { describe, it, expect } from "vitest";
import { subscribeSchema, isValidEmail } from "./validation";

describe("subscribeSchema", () => {
  it("accepts a valid email and trims whitespace", () => {
    const result = subscribeSchema.safeParse({ email: "  marcus@example.com  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("marcus@example.com");
  });

  it("rejects an invalid email", () => {
    const result = subscribeSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty email with a friendly message", () => {
    const result = subscribeSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Informe seu e-mail.");
    }
  });

  it("accepts an empty honeypot but allows it to be present", () => {
    const result = subscribeSchema.safeParse({ email: "a@b.com", website: "" });
    expect(result.success).toBe(true);
  });

  it("rejects a filled honeypot", () => {
    const result = subscribeSchema.safeParse({ email: "a@b.com", website: "spam" });
    expect(result.success).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("returns true for a valid email", () => {
    expect(isValidEmail("marcus@example.com")).toBe(true);
  });

  it("returns false for garbage", () => {
    expect(isValidEmail("nope")).toBe(false);
  });
});
