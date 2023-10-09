import {FC} from 'react';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {useModal} from '@modal/hooks';

import {DeleteEntityModal} from '@molecules';

import {CardForm} from '@organisms';

interface DeleteProps {
  name: string;
  description: string;
  label: string;
  redirectUrl: string;
  useDeleteMutation: UseMutation<MutationDefinition<string, any, any, void>>;
}

const Delete: FC<DeleteProps> = ({name, description, label, redirectUrl, useDeleteMutation}) => {
  const {open} = useModal({
    title: `Delete this ${label}`,
    width: 600,
    content: (
      <DeleteEntityModal
        defaultStackRoute={redirectUrl}
        useDeleteMutation={useDeleteMutation}
        name={name}
        entityLabel={label}
      />
    ),
  });

  return (
    <CardForm
      name="delete-entity-form"
      title={`Delete this ${label}`}
      description={description}
      confirmLabel="Delete"
      isWarning
      wasTouched
      onConfirm={open}
    />
  );
};

export default Delete;
