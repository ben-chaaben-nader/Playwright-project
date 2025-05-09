// pages/login.js

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: ' Login' });
    }

    /**
     * Navigate to the Login Page
     */
    async navigate() {
        console.log("Navigating to the login page...");
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    /**
     * Perform login with provided credentials
     * @param {string} username - The username to login
     * @param {string} password - The password to login
     */
    async login(username, password) {
        console.log(`Attempting to login with username: ${username}`);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Validate successful login
     * @returns {boolean} - True if login is successful
     */
    async isLoginSuccessful() {
        await this.page.waitForLoadState('networkidle');
        return this.page.url() === 'https://the-internet.herokuapp.com/secure';
    }

    /**
     * Get error message if login fails
     * @returns {string} - Error message text
     */
    async getErrorMessage() {
        const error = await this.page.locator('.flash.error');
        return error ? await error.textContent() : null;
    }
}

module.exports = { LoginPage };
