// tests/login.spec.js
// Importing necessary modules from Playwright for test and assertions
import { test, expect } from '@playwright/test';
// Importing the Page Object (LoginPage) to use its methods
import { LoginPage } from '../pages/login.js';

/**
 * Describe block to group related tests for Login Page
 */
test.describe('Login Page Tests', () => {

  /**
   * ✅ Test Case 1: Verify Navigation to Login Page and Page Title
   * - Navigates to the login page
   * - Verifies that the page title matches expectation
   */
  test('Should navigate to the login page and display the correct title', async ({ page }) => {
    // Initialize the LoginPage object
    const loginPage = new LoginPage(page);

    console.log("➡️ Navigating to Login Page...");
    await loginPage.navigate(); // Call the navigate method from LoginPage

    console.log("🔎 Validating page title...");
    // Expectation: The title should contain "The Internet"
    await expect(page).toHaveTitle(/The Internet/);
  });

  /**
   * ✅ Test Case 2: Successful Login with Valid Credentials
   * - Navigates to the login page
   * - Performs login with valid credentials
   * - Verifies if the user is successfully logged in
   */
  test('Should login successfully with valid credentials', async ({ page }) => {
    // Initialize the LoginPage object
    const loginPage = new LoginPage(page);

    console.log("➡️ Navigating to Login Page...");
    await loginPage.navigate(); // Navigate to the login page

    console.log("🔑 Attempting login with valid credentials...");
    // Attempt login with a valid username and password
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    console.log("✅ Validating successful login...");
    // Verify if the page navigated correctly to the secure area
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBeTruthy();
  });

  /**
   * ✅ Test Case 3: Unsuccessful Login with Invalid Credentials
   * - Navigates to the login page
   * - Attempts login with invalid credentials
   * - Verifies if the error message is displayed correctly
   */
  test('Should display an error with invalid credentials', async ({ page }) => {
    // Initialize the LoginPage object
    const loginPage = new LoginPage(page);

    console.log("➡️ Navigating to Login Page...");
    await loginPage.navigate(); // Navigate to the login page

    console.log("❌ Attempting login with invalid credentials...");
    // Attempt login with incorrect username and password
    await loginPage.login('invalidUser', 'invalidPass');

    console.log("🔍 Validating error message...");
    // Fetch the error message displayed
    const errorMessage = await loginPage.getErrorMessage();
    // Assert that the error message contains the expected text
    expect(errorMessage).toContain('Your username is invalid!');
  });
});
