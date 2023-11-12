import BasePage from "../BasePage.js";
import { expect } from "@playwright/test";

export default class UserProfilePage extends BasePage {
  userInfoField;

  constructor(page) {
    super(page, "/panel/profile", page.locator("p.profile_name.display-4"));
    this.userInfoField = page.locator("p.profile_name.display-4");
  }

  async checkUserInfo(name, lastName) {
    await expect(this.userInfoField).toHaveText(name + " " + lastName);
  }
}
