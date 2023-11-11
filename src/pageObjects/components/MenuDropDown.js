import BasePage from "../BasePage.js";
import { expect } from "@playwright/test";

export default class MenuDropDown extends BasePage {
  myProfileDropDown;
  profileOption;
  settingsOption;

  constructor(page) {
    super(page, "/", page.locator("button#userNavDropdown"));
    this.page = page;
    this.myProfileDropDown = page.locator("button#userNavDropdown");
    this.profileOption = page.locator("div.user-nav_menu-group a:nth-child(2)");
    this.settingsOption = page.locator(
      "div.user-nav_menu-group a:nth-child(3)"
    );
  }

  async clickMenu() {
    await this.myProfileDropDown.click();
  }

  async clickMenuOption(option) {
    await option.click();
    if (option == this.profileOption) {
      await expect(this.page).toHaveURL("/panel/profile");
    }
    if (option == this.settingsOption) {
      await expect(this.page).toHaveURL("/panel/settings");
    }
  }
}
