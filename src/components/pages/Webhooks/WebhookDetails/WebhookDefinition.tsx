import {FC} from 'react';
import {useParams} from 'react-router-dom';

import {Definition} from '@molecules';

import {useGetWebhookDefinitionQuery, useUpdateWebhookDefinitionMutation} from '@services/webhooks';

import {createSchemaOverride} from '@utils/createSchemaOverride';
import {testkubeCRDBases} from '@utils/externalLinks';

const WebhookDefinition: FC = () => {
  const {id = ''} = useParams();

  return (
    <Definition
      useGetDefinitionQuery={useGetWebhookDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateWebhookDefinitionMutation}
      name={id}
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
