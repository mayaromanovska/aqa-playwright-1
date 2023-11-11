import BasePage from "../BasePage.js";
import { expect } from "@playwright/test";

export default class UserProfilePage extends BasePage {
  userInfoField;

  constructor(page) {
    super(page, "/panel/profile", page.locator("p.profile_name.display-4"));
    this.userInfoField = page.locator("p.profile_name.display-4");
  }

  getUserInfo() {
    return this.userInfoField;
  }

  async checkUserInfo(name, lastName) {
    await expect(this.getUserInfo()).toHaveText(name + " " + lastName);
  }
}
