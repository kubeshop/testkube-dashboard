import config from '../config';

export default {
  'temp-wh-on-test-start': {
    name: 'example-webhook3',
    namespace: config.namespace,
    type: 'Webhook',
    resource: 'test',
    events: ['start-test'],
    selector: {
      asdf: 'asdf', // request: 'asdf=asdf'
    },
    uri: 'http://webhook-url.example.com',
  },
};
