import {type Page, expect} from '@playwright/test';

export class ExecutorGeneralSettingsPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async validateExecutorGeneralSettings(executorName: string, executorType: string): Promise<void> {
    const executorNameLocator = this.page.locator(
      `//input[@id="general-settings-name-type_name" and @value="${executorName}"]`
    );

    expect(executorNameLocator.isVisible()).toBeTruthy();

    const executorTypeLocator = this.page.locator(
      `//input[@id="general-settings-name-type_type" and @value="${executorType}"]`
    );
    expect(executorTypeLocator.isVisible()).toBeTruthy();
  }

  public async selectContainerImageTab(): Promise<void> {
    await this.page.click('div[data-test="sidebar-navigation-link:container-image"]');
  }

  public async selectCommandAndArgumentsTab(): Promise<void> {
    await this.page.click('div[data-test="sidebar-navigation-link:command---arguments"]');
  }

  public async selectDefinitionTab(): Promise<void> {
    await this.page.click('div[data-test="sidebar-navigation-link:definition"]');
  }

  public async setCommand(command: string): Promise<void> {
    await this.page.locator('#general-settings-name-type_command').fill(command);
    await this.page.locator('button[data-testid="configuration-card-confirm-button"]:not([disabled])').click();
  }

  public async validateCommand(command: string): Promise<void> {
    const commandLocator = this.page.locator(
      `//input[@id="general-settings-name-type_command" and @value="${command}"]`
    );
    expect(commandLocator.isVisible()).toBeTruthy();
  }

  public async addArgument(argument: string): Promise<void> {
    await this.page.getByTestId('add-argument-button').click();
    await this.page.getByPlaceholder('Your argument value').fill(argument);
    await this.page.locator('button[data-testid="configuration-card-confirm-button"]:not([disabled])').click();
  }

  public async validateArgument(argument: string): Promise<void> {
    const argumentLocator = this.page.locator(`//input[@value="${argument}"]`);
    expect(argumentLocator.isVisible()).toBeTruthy();
  }

  public async setDefinition(definition: string): Promise<void> {
    const monacoEditor = await this.page.locator('.monaco-editor').nth(0);
    await monacoEditor.click();
    await this.page.keyboard.press('Meta+ArrowDown');

    await this.page.keyboard.type(definition);
    await this.page.locator('button[data-testid="configuration-card-confirm-button"]:not([disabled])').click();
  }

  public async validateDefinition(definition: string): Promise<void> {
    const monacoEditor = await this.page.locator('.monaco-editor').nth(0);

    const definitionLocator = monacoEditor.locator(`//div[contains(.,"${definition}")]`);
    expect(definitionLocator.isVisible()).toBeTruthy();
  }

  public async validateContainerImageSettings(containerImage: string): Promise<void> {
    const containerImageLocator = this.page.locator(
      `//input[@id="container-image-settings-name-type_container_image" and @value="${containerImage}"]`
    );
    expect(containerImageLocator.isVisible()).toBeTruthy();
  }

  public async deleteExecutor(executorName: string): Promise<void> {
    await this.page.click('button[data-testid="configuration-card-confirm-button"]');
    await this.page.getByTestId('delete-entity-input').fill(executorName);
    await this.page.getByTestId('delete-action-btn').click();
  }
}
