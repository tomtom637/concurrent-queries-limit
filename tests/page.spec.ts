import { test, expect } from "@playwright/test";

test("my dogs and cats heading", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page.getByRole("heading", { name: "My Dogs" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "My Cats" })).toBeVisible();
});

test("successfully fetches data", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Click the get started link.
  await expect(page.getByText("Fido")).toBeVisible();
  await expect(page.getByText("Bailey")).toBeVisible();
});
