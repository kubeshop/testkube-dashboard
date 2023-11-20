import {FC} from 'react';

import {Delete} from '@molecules/CommonSettings';

import {Permissions, usePermission} from '@permissions/base';

import {useDeleteWebhookMutation} from '@services/webhooks';

import {useWebhooksPick} from '@store/webhooks';

import Name from './Name';

const GeneralTab: FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);
  const {current} = useWebhooksPick('current');
  const [deleteWebhook] = useDeleteWebhookMutation();
  return (
    <>
      <Name />
      {mayDelete ? (
        <Delete
          name={current!.name}
          label="webhook"
          description="This webhook will be permanently deleted. All your automation linked to this webhook will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
          redirectUrl="/webhooks"
          onDelete={deleteWebhook}
        />
      ) : null}
    </>
  );
};

export default GeneralTab;
