import {createContext} from 'react';

import {Webhook} from '@models/webhook';

interface WebhookDetailsContextData {
  webhooksDetails?: Webhook;
}

const WebhookDetailsContext = createContext<WebhookDetailsContextData>(undefined!);

export default WebhookDetailsContext;
