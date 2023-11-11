import { expect, test } from "@playwright/test";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";
import RegistrationPopup from "../../src/pageObjects/components/RegistrationPopup.js";
import MenuDropDown from "../../src/pageObjects/components/MenuDropDown.js";
import UserProfilePage from "../../src/pageObjects/userProfilePage/UserProfilePage.js";
import SettingsPage from "../../src/pageObjects/settingsPage/SettingsPage.js";

const name = "aqamay";
const lastName = "aqarom";
const email = "aqa-rom@gmail.com";
const password = "Password1";
const repeatPassword = password;

// mandatory fields errors
const errorsMandatoryFields = [
  "Name required",
  "Last name required",
  "Email required",
  "Password required",
  "Re-enter password required",
];
// incorrect values
const incorrectName = "aqamay3";
const incorrectLastName = "aqarom3";
const incorrectEmail = "aqa-rom3";
const incorrectPassword = "password";
const incorrectRepeatPassword = incorrectPassword;
// incorrect values errors
const errorsIncorrectValues = [
  "Name is invalid",
  "Last name is invalid",
  "Email is incorrect",
  "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
  "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
];
// incorrect length
const incorrectNameLength = "a";
const incorrectLastNameLength = "a";
const incorrectPasswordLength = "Pass1";
const incorrectRepeatPasswordLength = incorrectPasswordLength;
// incorrect length errors
const errorsIncorrectValuesLength = [
  "Name has to be from 2 to 20 characters long",
  "Last name has to be from 2 to 20 characters long",
  "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
  "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
];
// passwords do not match
const repeatPasswordNotSame = "Password2";
const errorsPasswordLengthNotSameText = ["Passwords do not match"];

test.describe("Registration fuctionality", () => {
  let page;
  let welcomePage;
  let registrationPopup;
  let menuDropDown;
  let userProfilePage;
  let settingsPage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      viewport: {
        width: 1920,
        height: 1080,
      },
    });

    page = await context.newPage();
    welcomePage = new WelcomePage(page);
  });

  test.beforeEach(async () => {
    await welcomePage.open();
    await welcomePage.waitLoaded();
    await welcomePage.getRegistrationPopup();
    registrationPopup = new RegistrationPopup(page);
    await registrationPopup.waitLoaded();
  });

  // #1 Register User with correct data
  test("Register User with correct data", async () => {
    await registrationPopup.fillOutFields(
      name,
      lastName,
      email,
      password,
      repeatPassword
    );
    await registrationPopup.registerUser();
    menuDropDown = new MenuDropDown(page);
    await menuDropDown.waitLoaded();
    await menuDropDown.clickMenu();
    await menuDropDown.clickMenuOption(menuDropDown.profileOption);
    userProfilePage = new UserProfilePage(page);
    await userProfilePage.waitLoaded();
    await userProfilePage.getUserInfo();
    await userProfilePage.checkUserInfo(name, lastName);
    // delete user
    await menuDropDown.clickMenu();
    await menuDropDown.clickMenuOption(menuDropDown.settingsOption);
    settingsPage = new SettingsPage(page);
    await settingsPage.waitLoaded();
    await settingsPage.deleteUser();
  });

  // // #2 Fields are mandatory
  test("Fields are mandatory", async () => {
    await registrationPopup.clickFields();
    const actualErrorsText = await registrationPopup.getErrorsText();
    registrationPopup.checkErrorsText(actualErrorsText, errorsMandatoryFields);
  });

  // #3 Fields should contain correct values
  test("Fields should contain correct value", async () => {
    await registrationPopup.fillOutFields(
      incorrectName,
      incorrectLastName,
      incorrectEmail,
      incorrectPassword,
      incorrectRepeatPassword
    );
    const actualErrorsText = await registrationPopup.getErrorsText();
    registrationPopup.checkErrorsText(actualErrorsText, errorsIncorrectValues);
  });

  // #4 Fields values should has correct length
  test("Fields values should has correct length", async () => {
    await registrationPopup.fillOutFields(
      incorrectNameLength,
      incorrectLastNameLength,
      email,
      incorrectPasswordLength,
      incorrectRepeatPasswordLength
    );
    const actualErrorsText = await registrationPopup.getErrorsText();
    registrationPopup.checkErrorsText(
      actualErrorsText,
      errorsIncorrectValuesLength
    );
  });

  // #5 Passwords do not match
  test("Passwords do not match", async () => {
    await registrationPopup.fillOutFields(
      name,
      lastName,
      email,
      password,
      repeatPasswordNotSame
    );
    const actualErrorsText = await registrationPopup.getErrorsText();
    registrationPopup.checkErrorsText(
      actualErrorsText,
      errorsPasswordLengthNotSameText
    );
  });
});
