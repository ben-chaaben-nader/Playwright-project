Playwright Project

📌 Overview

This project demonstrates the implementation of the Page Object Model (POM) design pattern with Playwright for end-to-end (E2E) testing. It includes best practices for structuring test cases, managing locators, and running tests across different browsers.

🚀 Installation & Setup

Make sure you have Node.js (>= 16) installed. Then, run the following commands:

# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd Playwright_Project

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

📂 Project Structure

Playwright_Project/
├── .github/workflows
│   └── playwright.yml
├── .idea
├── pages
│   └── login.js
├── tests
│   └── login.spec.js
├── tests-examples
│   └── demo-todo-app.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md

pages/ → Contains Page Object Models.

tests/ → Contains Playwright test scenarios.

tests-examples/ → Sample tests for reference.

playwright.config.ts → Configuration for browsers, timeouts, and parallel execution.

✅ Running Tests

To execute all tests, run:

npx playwright test

To run tests in a specific browser:

npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

To run a single test:

npx playwright test tests/login.spec.js

To run tests with a specific tag:

npx playwright test --grep @SmokeTest

📊 Generating Reports

To generate an HTML report:

npx playwright show-report

This will open an HTML summary of the test execution in your default browser.

⚙️ Configuration

You can update the configuration in playwright.config.ts to change the base URL, timeout settings, and browser options.

🤝 Contributing

Feel free to fork this repository and submit pull requests. All contributions are welcome!

📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

