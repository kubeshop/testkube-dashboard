import {FC} from 'react';

import {Definition} from '@molecules';

import {useGetWebhookDefinitionQuery, useUpdateWebhookDefinitionMutation} from '@services/webhooks';

import {useWebhooksPick} from '@store/webhooks';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

const WebhookDefinition: FC = () => {
  const {current} = useWebhooksPick('current');
  return (
    <Definition
      useGetDefinitionQuery={useGetWebhookDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateWebhookDefinitionMutation}
      name={current!.name}
      label="webhook"
      crdUrl={testkubeCRDBases.webhooks}
      overrideSchema={createSchemaOverride($ => {
        $.required('spec', 'apiVersion', 'kind');
        $.property('metadata').required('name');
        $.property('apiVersion').merge({const: 'executor.testkube.io/v1'});
        $.property('kind').merge({const: 'Webhook'});
      })}
    />
  );
};

export default WebhookDefinition;
