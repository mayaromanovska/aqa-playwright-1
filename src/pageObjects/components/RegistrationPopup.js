import BaseComponent from "../BaseComponent.js";
import { expect } from "@playwright/test";

export default class RegistrationPopup extends BaseComponent {
  nameInput;
  lastNameInput;
  emailInput;
  passwordInput;
  repeatPasswordInput;
  registerButton;
  errors;

  constructor(page) {
    super(page, page.locator("div.modal-content"));
    this.page = page;
    this.nameInput = page.locator("input#signupName");
    this.lastNameInput = page.locator("input#signupLastName");
    this.emailInput = page.locator("input#signupEmail");
    this.passwordInput = page.locator("input#signupPassword");
    this.repeatPasswordInput = page.locator("input#signupRepeatPassword");
    this.registerButton = page.locator("button.btn.btn-primary:nth-child(1)");
    this.errors = this.page.locator("form div > p");
  }

  async fillOutFields(name, lastName, email, password, repeatPassword) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
    await this.repeatPasswordInput.blur();
  }

  async registerUser() {
    await this.registerButton.click();
    await expect(this.page).toHaveURL("/panel/garage");
  }

  async getErrorsText() {
    let actualErrorsText = [];
    for (const errorItem of await this.errors.all()) {
      const text = await errorItem.innerText();
      actualErrorsText.push(text);
    }
    return actualErrorsText;
  }
  async checkErrorsText(actualErrorsText, expectedErrorsText) {
    await expect(actualErrorsText).toEqual(expectedErrorsText);
  }
}
