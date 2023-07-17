import type {Page} from '@playwright/test';

export class NavigationSiderPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async openMenuItem(itemName: string): Promise<void> {
    await this.page.click(
      `//*[@data-cy="navigation-sider"]//*[@data-cy="navigation-tab" and contains(@href,"${itemName}")]`
    ); // TODO: data-test needed
    await this.page.waitForURL(`**/${itemName}`);
  }
}
