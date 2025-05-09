import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

/**
 * ✅ Playwright Configuration File
 * - Optimized for Multi-Browser Testing
 * - Configured for Allure, HTML, and JSON Reporting
 * - Supports Environment Variables
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 4, // 4 parallel workers in local, 1 in CI
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
    ['json', { outputFile: 'playwright-report/test-results.json' }],
    ['allure-playwright'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.playwright.dev/todomvc',
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure', // Keep video only if test fails
    screenshot: 'only-on-failure', // Take screenshot only on failure
    trace: 'on-first-retry', // Capture trace only if the test fails the first time
    launchOptions: {
      slowMo: 50, // Adds a delay for better visibility during debugging
      args: ['--disable-web-security', '--no-sandbox'],
    },
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  outputDir: 'test-results/',
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
