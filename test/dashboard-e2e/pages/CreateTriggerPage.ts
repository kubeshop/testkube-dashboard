import type {Page} from '@playwright/test';

import type {TriggerData} from '../types';

export class CreateTriggerPage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async createTrigger(triggerData: Partial<TriggerData>): Promise<void> {
    //TODO
  }
}
