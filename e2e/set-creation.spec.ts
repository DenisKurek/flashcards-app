import { test, expect } from "@playwright/test";
import { describe } from "node:test";

describe("set creation", () => {
  test("succesfull creation test", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.getByPlaceholder("email").fill("test.user@gmail.com");
    await page.getByPlaceholder("password").fill("testpassword");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Actions").click();
    await page.getByRole("link", { name: "Create new Set" }).click();
    await page.getByLabel("Set Name:").fill("Test set");
    await page.getByText("+").click();
    await page.getByPlaceholder("concept").fill("Test");
    await page.getByPlaceholder("definition").fill("flashcard");
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByRole("heading", { name: "Test set" })).toBeVisible();
    await page.locator("path").nth(1).click();
    await expect(
      page.getByRole("heading", { name: "Test set" }),
    ).not.toBeVisible();
  });
});
