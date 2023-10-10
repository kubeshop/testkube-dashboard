import config from '../config';

export default {
  'temp-wh-on-test-start': {
    name: 'example-webhook3',
    namespace: config.namespace,
    events: ['start-test'],
    selector: {
      asdf: 'asdf', // request: 'asdf=asdf'
      bbb: 'ccc',
    },
    uri: 'http://webhook-url.example.com',
  },
};
