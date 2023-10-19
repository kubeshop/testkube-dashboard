import type {Page} from '@playwright/test';

export class ExecutorGeneralSettingsPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async deleteExecutor(executorName: string): Promise<void> {
    await this.page.click('button[data-testid="configuration-card-confirm-button"]');
    await this.page.getByTestId('delete-entity-input').fill(executorName);
    await this.page.getByTestId('delete-action-btn').click();
  }
}
