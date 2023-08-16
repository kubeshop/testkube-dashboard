import {createContext} from 'react';

import {Webhook} from '@models/webhook';

interface WebhookDetailsContextData {
  webhookDetails?: Webhook;
  setWebhookDetails: (webhook: Webhook) => void;
}

const WebhookDetailsContext = createContext<WebhookDetailsContextData>(undefined!);

export default WebhookDetailsContext;
