import { expect, test } from "@playwright/test";

const name = "aqamay";
const lastName = "aqarom";
const email = "aqa-rom5@gmail.com";
const password = "Password1";
const repeatPassword = password;
// empty fields errors
const errorNameRequiredText = "Name required";
const errorLastNameRequiredText = "Last name required";
const errorEmailRequiredText = "Email required";
const errorPasswordRequiredText = "Password required";
const errorRepeatPasswordRequiredText = "Re-enter password required";
// incorrect values
const incorrectName = "aqamay3";
const incorrectLastName = "aqarom3";
const incorrectEmail = "aqa-rom3";
const incorrectPassword = "password";
const incorrectRepeatPassword = incorrectPassword;
// incorrect values errors
const errorIncorrectNameText = "Name is invalid";
const errorIncorrectLastNameText = "Last name is invalid";
const errorIncorrectEmailText = "Email is incorrect";
const errorIncorrectPasswordText =
  "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";
const errorIncorrectRepeatPasswordText = errorIncorrectPasswordText;
// incorrect length
const incorrectNameLength = "a";
const incorrectLastNameLength = "a";
const incorrectPasswordLength = "Pass1";
const incorrectRepeatPasswordLength = incorrectPasswordLength;
// incorrect length errors
const errorIncorrectNameLengthText =
  "Name has to be from 2 to 20 characters long";
const errorIncorrectLastNameLengthText =
  "Last name has to be from 2 to 20 characters long";
const errorIncorrectPasswordLengthText =
  "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";
const errorIncorrectRepeatPasswordLengthText = errorIncorrectPasswordLengthText;
// passwords do not match
const repeatPasswordNotSame = "Password2";
const errorPasswordLengthNotSameText = "Passwords do not match";

test.describe("Registration", () => {
  // #1 Register User with correct data
  test("Register User with correct data", async ({ page }) => {
    await page.goto("/");
    const signinButton = page.locator(
      "button.btn.btn-outline-white.header_signin"
    );
    await signinButton.click();

    const popupLogin = page.locator("div.modal-content");
    await expect(popupLogin, "Log in popup should be visible").toBeVisible();

    const registrationButton = popupLogin.locator(
      "button.btn.btn-link:nth-child(1)"
    );
    await registrationButton.click();

    const popupRegistration = page.locator("div.modal-content");
    await expect(
      popupRegistration,
      "Registration popup should be visible"
    ).toBeVisible();

    const nameInput = popupRegistration.locator("input#signupName");
    const lastNameInput = popupRegistration.locator("input#signupLastName");
    const emailInput = popupRegistration.locator("input#signupEmail");
    const passwordInput = popupRegistration.locator("input#signupPassword");
    const repeatPasswordInput = popupRegistration.locator(
      "input#signupRepeatPassword"
    );
    const registerButton = popupRegistration.locator(
      "button.btn.btn-primary:nth-child(1)"
    );

    await nameInput.fill(name);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill(repeatPassword);
    await registerButton.click();

    await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");

    const myProfileDropDown = page.locator("button#userNavDropdown");
    await myProfileDropDown.click();

    const profileOption = page.locator(
      "div.user-nav_menu-group a:nth-child(2)"
    );
    await profileOption.click();

    const userInfo = page.locator("p.profile_name.display-4");
    expect(await userInfo.innerText()).toEqual(name + " " + lastName);
  });

  // #2 Fields are mandatory
  test("Fields are mandatory", async ({ page }) => {
    await page.goto("/");
    const signinButton = page.locator(
      "button.btn.btn-outline-white.header_signin"
    );
    await signinButton.click();

    const popupLogin = page.locator("div.modal-content");
    await expect(popupLogin, "Log in popup should be visible").toBeVisible();

    const registrationButton = popupLogin.locator(
      "button.btn.btn-link:nth-child(1)"
    );
    await registrationButton.click();

    const popupRegistration = page.locator("div.modal-content");
    await expect(
      popupRegistration,
      "Registration popup should be visible"
    ).toBeVisible();

    const nameInput = popupRegistration.locator("input#signupName");
    const lastNameInput = popupRegistration.locator("input#signupLastName");
    const emailInput = popupRegistration.locator("input#signupEmail");
    const passwordInput = popupRegistration.locator("input#signupPassword");
    const repeatPasswordInput = popupRegistration.locator(
      "input#signupRepeatPassword"
    );

    await nameInput.click();
    await lastNameInput.click();
    await emailInput.click();
    await passwordInput.click();
    await repeatPasswordInput.click();
    await passwordInput.click();

    let errorLabel;
    errorLabel = popupRegistration.locator("form > div:nth-child(1) > div > p");
    expect(await errorLabel.innerText()).toEqual(errorNameRequiredText);

    errorLabel = popupRegistration.locator("form > div:nth-child(2) > div > p");
    expect(await errorLabel.innerText()).toEqual(errorLastNameRequiredText);

    errorLabel = popupRegistration.locator("form > div:nth-child(3) > div > p");
    expect(await errorLabel.innerText()).toEqual(errorEmailRequiredText);

    errorLabel = popupRegistration.locator("form > div:nth-child(4) > div > p");
    expect(await errorLabel.innerText()).toEqual(errorPasswordRequiredText);

    errorLabel = popupRegistration.locator("form > div:nth-child(5) > div > p");
    expect(await errorLabel.innerText()).toEqual(
      errorRepeatPasswordRequiredText
    );
  });

  // #3 Fields should contain correct values
  test("Fields should contain correct value", async ({ page }) => {
    await page.goto("/");
    const signinButton = page.locator(
      "button.btn.btn-outline-white.header_signin"
    );
    await signinButton.click();

    const popupLogin = page.locator("div.modal-content");
    await expect(popupLogin, "Log in popup should be visible").toBeVisible();

    const registrationButton = popupLogin.locator(
      "button.btn.btn-link:nth-child(1)"
    );
    await registrationButton.click();

    const popupRegistration = page.locator("div.modal-content");
    await expect(
      popupRegistration,
      "Registration popup should be visible"
    ).toBeVisible();

    const nameInput = popupRegistration.locator("input#signupName");
    const lastNameInput = popupRegistration.locator("input#signupLastName");
    const emailInput = popupRegistration.locator("input#signupEmail");
    const passwordInput = popupRegistration.locator("input#signupPassword");
    const repeatPasswordInput = popupRegistration.locator(
      "input#signupRepeatPassword"
    );

    await nameInput.fill(incorrectName);
    await lastNameInput.fill(incorrectLastName);
    await emailInput.fill(incorrectEmail);
    await passwordInput.fill(incorrectPassword);
    await repeatPasswordInput.fill(incorrectRepeatPassword);
    await passwordInput.click();

    let errorLabel;
    errorLabel = popupRegistration.locator("form > div:nth-child(1) > div > p");
    expect(await errorLabel.innerText()).toEqual(errorIncorrectNameText);

    errorLabel = popupRegistration.locator("form > div:nth-child(2) > div > p");
    expect(await errorLabel.innerText()).toEqual(errorIncorrectLastNameText);

    errorLabel = popupRegistration.locator("form > div:nth-child(3) > div > p");
    expect(await errorLabel.innerText()).toEqual(errorIncorrectEmailText);

    errorLabel = popupRegistration.locator("form > div:nth-child(4) > div > p");
    expect(await errorLabel.innerText()).toEqual(errorIncorrectPasswordText);

    errorLabel = popupRegistration.locator("form > div:nth-child(5) > div > p");
    expect(await errorLabel.innerText()).toEqual(
      errorIncorrectRepeatPasswordText
    );
  });

  // #4 Fields values should has correct length
  test("Fields values should has correct length", async ({ page }) => {
    await page.goto("/");
    const signinButton = page.locator(
      "button.btn.btn-outline-white.header_signin"
    );
    await signinButton.click();

    const popupLogin = page.locator("div.modal-content");
    await expect(popupLogin, "Log in popup should be visible").toBeVisible();

    const registrationButton = popupLogin.locator(
      "button.btn.btn-link:nth-child(1)"
    );
    await registrationButton.click();

    const popupRegistration = page.locator("div.modal-content");
    await expect(
      popupRegistration,
      "Registration popup should be visible"
    ).toBeVisible();

    const nameInput = popupRegistration.locator("input#signupName");
    const lastNameInput = popupRegistration.locator("input#signupLastName");
    const passwordInput = popupRegistration.locator("input#signupPassword");
    const repeatPasswordInput = popupRegistration.locator(
      "input#signupRepeatPassword"
    );

    await nameInput.fill(incorrectNameLength);
    await lastNameInput.fill(incorrectLastNameLength);
    await passwordInput.fill(incorrectPasswordLength);
    await repeatPasswordInput.fill(incorrectRepeatPasswordLength);
    await passwordInput.click();

    let errorLabel;
    errorLabel = popupRegistration.locator("form > div:nth-child(1) > div > p");
    expect(await errorLabel.innerText()).toEqual(errorIncorrectNameLengthText);

    errorLabel = popupRegistration.locator("form > div:nth-child(2) > div > p");
    expect(await errorLabel.innerText()).toEqual(
      errorIncorrectLastNameLengthText
    );

    errorLabel = popupRegistration.locator("form > div:nth-child(4) > div > p");
    expect(await errorLabel.innerText()).toEqual(
      errorIncorrectPasswordLengthText
    );

    errorLabel = popupRegistration.locator("form > div:nth-child(5) > div > p");
    expect(await errorLabel.innerText()).toEqual(
      errorIncorrectRepeatPasswordLengthText
    );
  });

  // #5 Passwords do not match
  test("Passwords do not match", async ({ page }) => {
    await page.goto("/");
    const signinButton = page.locator(
      "button.btn.btn-outline-white.header_signin"
    );
    await signinButton.click();

    const popupLogin = page.locator("div.modal-content");
    await expect(popupLogin, "Log in popup should be visible").toBeVisible();

    const registrationButton = popupLogin.locator(
      "button.btn.btn-link:nth-child(1)"
    );
    await registrationButton.click();

    const popupRegistration = page.locator("div.modal-content");
    await expect(
      popupRegistration,
      "Registration popup should be visible"
    ).toBeVisible();

    const passwordInput = popupRegistration.locator("input#signupPassword");
    const repeatPasswordInput = popupRegistration.locator(
      "input#signupRepeatPassword"
    );

    await passwordInput.fill(password);
    await repeatPasswordInput.fill(repeatPasswordNotSame);
    await passwordInput.click();

    let errorLabel;
    errorLabel = popupRegistration.locator("form > div:nth-child(5) > div > p");
    expect(await errorLabel.innerText()).toEqual(
      errorPasswordLengthNotSameText
    );
  });
});
