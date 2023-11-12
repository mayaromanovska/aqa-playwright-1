import BasePage from "../BasePage.js";
import RegistrationPopup from "../components/RegistrationPopup.js";
import { expect } from "@playwright/test";

export default class WelcomePage extends BasePage {
  signinButton;
  registrationPopup;

  constructor(page) {
    super(page, "/", page.locator("div.col-12.col-lg-4 > div > button"));
    this.signinButton = page.locator("div.col-12.col-lg-4 > div > button");
    this.registrationPopup = page.locator("div.modal-content");
  }

  async openRegistrationPopup() {
    await this.signinButton.click();
    await expect(
      this.registrationPopup,
      "Registration popup should be visible"
    ).toBeVisible();
    return new RegistrationPopup(this._page);
  }
}
