// tests/todo.spec.js
import { test, expect } from '@playwright/test';

/**
 * ✅ Page Object Model for Todo Application
 */
class TodoPage {
  constructor(page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoTitle = page.getByTestId('todo-title');
    this.todoCount = page.getByTestId('todo-count');
    this.toggleAll = page.getByLabel('Mark all as complete');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.activeFilter = page.getByRole('link', { name: 'Active' });
    this.completedFilter = page.getByRole('link', { name: 'Completed' });
    this.allFilter = page.getByRole('link', { name: 'All' });
  }

  async navigate() {
    console.log("➡️ Navigating to the Todo App...");
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(item) {
    console.log(`➕ Adding todo: ${item}`);
    await this.newTodoInput.fill(item);
    await this.newTodoInput.press('Enter');
  }

  async addMultipleTodos(items) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  async markAsComplete(index) {
    console.log(`✅ Marking item ${index} as complete`);
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async markAsIncomplete(index) {
    console.log(`❌ Marking item ${index} as incomplete`);
    await this.todoItems.nth(index).getByRole('checkbox').uncheck();
  }

  async clearCompleted() {
    console.log("🗑️ Clearing completed todos");
    await this.clearCompletedButton.click();
  }

  async filterActive() {
    console.log("🔍 Filtering Active Todos");
    await this.activeFilter.click();
  }

  async filterCompleted() {
    console.log("🔍 Filtering Completed Todos");
    await this.completedFilter.click();
  }

  async filterAll() {
    console.log("🔍 Filtering All Todos");
    await this.allFilter.click();
  }

  async getTodoCount() {
    console.log("📌 Fetching todo count...");
    return await this.todoCount.textContent();
  }
}

/**
 * ✅ Test Suite for Todo Application
 */
test.describe('Todo Application Tests', () => {
  const TODO_ITEMS = [
    'Buy some cheese',
    'Feed the cat',
    'Book a doctor appointment'
  ];

  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.navigate();
    await todoPage.addMultipleTodos(TODO_ITEMS);
  });

  test('Should add new todo items', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.todoTitle).toHaveText(TODO_ITEMS);
  });

  test('Should mark todo as complete', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.markAsComplete(0);
    await expect(todoPage.todoItems.nth(0)).toHaveClass('completed');
  });

  test('Should clear completed todos', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.markAsComplete(0);
    await todoPage.clearCompleted();
    await expect(todoPage.todoItems).toHaveCount(2);
  });

  test('Should filter active todos', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.markAsComplete(1);
    await todoPage.filterActive();
    await expect(todoPage.todoTitle).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('Should filter completed todos', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.markAsComplete(1);
    await todoPage.filterCompleted();
    await expect(todoPage.todoTitle).toHaveText([TODO_ITEMS[1]]);
  });

  test('Should display the correct number of items', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const count = await todoPage.getTodoCount();
    expect(count).toContain('3 items left');
  });
});
