type WebhookSelectorItem = {label: string; value: string};

export const decodeWebhookSelector = (selector: string = ''): string[] =>
  selector
    .split(',')
    .filter(Boolean)
    .map(x => x.replace('=', ':'));

export const decodeWebhookSelectorArray = (selector = ''): WebhookSelectorItem[] =>
  decodeWebhookSelector(selector).map(x => ({label: x, value: x}));
