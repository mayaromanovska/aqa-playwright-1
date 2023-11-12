import BaseComponent from "../BaseComponent.js";
import UserProfilePage from "../userProfilePage/UserProfilePage.js";
import SettingsPage from "../settingsPage/SettingsPage.js";
import { expect } from "@playwright/test";

export default class MenuDropDown extends BaseComponent {
  myProfileDropDown;
  profileOption;
  profileName;
  settingsOption;
  settingsName;

  constructor(page) {
    super(page, page.locator("button#userNavDropdown"));
    this.myProfileDropDown = page.locator("button#userNavDropdown");
    this.profileOption = page.locator("div.user-nav_menu-group a:nth-child(2)");
    this.settingsOption = page.locator(
      "div.user-nav_menu-group a:nth-child(3)"
    );
    this.profileName = this.profileOption.innerText();
    this.settingsName = this.settingsOption.innerText();
  }

  async openMenu() {
    await this.myProfileDropDown.click();
  }

  async clickMenuOption(optionName) {
    if (optionName == this.profileName) {
      await this.profileOption.click();
      await expect(this._page).toHaveURL("/panel/profile");
      return new UserProfilePage(this._page);
    }
    if (optionName == this.settingsName) {
      await this.settingsOption.click();
      await expect(this._page).toHaveURL("/panel/settings");
      return new SettingsPage(this._page);
    }
  }
}
