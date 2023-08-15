import {FC} from 'react';
import {useParams} from 'react-router-dom';

import {Definition} from '@molecules';

import {useGetWebhookDefinitionQuery, useUpdateWebhookDefinitionMutation} from '@services/webhooks';

const WebhookDefinition: FC = () => {
  const {id = ''} = useParams();

  return (
    <Definition
      useGetDefinitionQuery={useGetWebhookDefinitionQuery}
      useUpdateDefinitionMutation={useUpdateWebhookDefinitionMutation}
      name={id}
      label="webhook definition"
    />
  );
};

export default WebhookDefinition;
