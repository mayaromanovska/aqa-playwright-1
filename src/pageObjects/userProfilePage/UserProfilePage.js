import BasePage from "../BasePage.js";
import { expect } from "@playwright/test";

export default class UserProfilePage extends BasePage {
  userInfo;

  constructor(page) {
    super(page, "/panel/profile", page.locator("p.profile_name.display-4"));
    this.userInfo = page.locator("p.profile_name.display-4");
  }

  getUserInfo() {
    return this.userInfo.innerText();
  }

  async checkUserInfo(name, lastName) {
    await expect(this.userInfo).toHaveText(name + " " + lastName);
  }
}
