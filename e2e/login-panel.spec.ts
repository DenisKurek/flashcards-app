import { test, expect } from "@playwright/test";
import { describe } from "node:test";

describe("login page tests", () => {
  test("unsuccesfull login test", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.getByPlaceholder("email").fill("incorect@email.com");
    await page.getByPlaceholder("password").fill("pasword");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      await page.locator("div").filter({ hasText: "No User Found!" }),
    ).toBeVisible();
  });

  test("succesfull login test", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.getByPlaceholder("email").fill("test.user@gmail.com");
    await page.getByPlaceholder("password").fill("testpassword");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Actions")).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });
});
