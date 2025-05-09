// tests/login.spec.js
// Import the required Playwright modules for testing and assertions
import { test, expect } from '@playwright/test';
// Import the Page Object for the Login page
import { LoginPage } from '../pages/login';

// ✅ Test Case: Successful Login Test
test('Successful Login with Valid Credentials', async ({ page }) => {

  // 📝 Initialize the LoginPage object with the Playwright page instance
  const Login = new LoginPage(page);

  console.log("➡️ Navigating to the Login Page...");
  // 🔄 Navigate to the login page URL
  await Login.gotoPageLogin();

  console.log("🔑 Attempting login with valid credentials...");
  // 🔄 Perform login with username and password
  await Login.login('tomsmith', 'SuperSecretPassword');

  console.log("✅ Validating successful login...");
  // ✅ Assertion: Verify that the URL changes to the secure area after login
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');

  // ✅ Assertion: Verify that the "Logout" button is visible, indicating successful login
  const logoutButton = page.getByRole('link', { name: 'Logout' });
  await expect(logoutButton).toBeVisible();
});
