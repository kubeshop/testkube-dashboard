import {FC, useContext} from 'react';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {ModalContext} from '@contexts';

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
  const {setModalConfig, setModalOpen} = useContext(ModalContext);

  const onConfirm = () => {
    setModalConfig({
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
    setModalOpen(true);
  };

  return (
    <CardForm
      name="delete-entity-form"
      title={`Delete this ${label}`}
      description={description}
      confirmLabel="Delete"
      isWarning
      wasTouched
      onConfirm={onConfirm}
    />
  );
};

export default Delete;
