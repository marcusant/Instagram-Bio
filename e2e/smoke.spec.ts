import { test, expect } from "@playwright/test";

test("bio page renders profile, links and is accessible at a basic level", async ({ page }) => {
  await page.goto("/");

  // Profile name as the single h1.
  const h1 = page.locator("h1");
  await expect(h1).toBeVisible();
  await expect(h1).toContainText("Marcus");

  // Social nav present.
  await expect(page.getByRole("navigation", { name: "Redes sociais" })).toBeVisible();

  // At least one link button with a real href that opens in a new tab.
  const firstLink = page.locator("a.link-button").first();
  await expect(firstLink).toBeVisible();
  await expect(firstLink).toHaveAttribute("target", "_blank");
  await expect(firstLink).toHaveAttribute("rel", /noopener/);

  // Subscribe section heading.
  await expect(page.getByRole("heading", { level: 2 })).toBeVisible();
});

test("theme toggle switches the html class", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveClass(/dark/);

  await page.getByRole("button", { name: /tema claro/i }).click();
  await expect(html).not.toHaveClass(/dark/);
});

test("subscribe flow validates and accepts a valid email", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Quero receber" }).click();
  await page.getByPlaceholder("seu@email.com").fill("marcus@example.com");
  await page.getByRole("button", { name: /Quero receber|Enviando/ }).click();
  await expect(page.getByRole("status")).toBeVisible();
});
