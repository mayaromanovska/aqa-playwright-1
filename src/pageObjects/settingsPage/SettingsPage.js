import BasePage from "../BasePage.js";
import { expect } from "@playwright/test";

export default class SettingsPage extends BasePage {
  removeAccountButton;
  removeButton;

  constructor(page) {
    super(
      page,
      "/",
      page.locator(
        "div.user-settings_item.-form.-remove-account > div > button"
      )
    );
    this.page = page;
    this.removeAccountButton = page.locator(
      "div.user-settings_item.-form.-remove-account > div > button"
    );
    this.removeButton = page.locator("button.btn.btn-danger");
  }

  async deleteUser() {
    await this.removeAccountButton.click();
    await this.removeButton.click();
    await expect(this.page).toHaveURL("/");
  }
}
