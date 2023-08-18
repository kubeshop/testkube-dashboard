import {FC, useContext} from 'react';

import {Form} from 'antd';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {ModalContext} from '@contexts';

import {ConfigurationCard, DeleteEntityModal} from '@molecules';

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
    <Form name="delete-entity-form">
      <ConfigurationCard
        title={`Delete this ${label}`}
        description={description}
        onConfirm={onConfirm}
        isWarning
        confirmButtonText="Delete"
        forceEnableButtons
      />
    </Form>
  );
};

export default Delete;
