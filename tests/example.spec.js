// @ts-check

import { expect, test } from "@playwright/test";

test.beforeAll(async () => {
  //
});

//describe
test.describe("Test", () => {
  // it

  test.beforeAll(async () => {
    //
  });

  test.beforeEach(async () => {
    //
  });

  test.afterEach(async () => {
    //
  });

  test.afterAll(async () => {
    //
  });

  test("has title 1 @smoke", async ({ page }) => {
    await test.step("Navigate to Hillel Qauto site", async () => {
      await page.goto("/");
    });

    await test.step("Check page title", async () => {
      await expect(page).toHaveTitle(/Hillel Qauto/);
    });
  });
});
