import {useContext} from 'react';

import {Form} from 'antd';

import {useEntityDetailsConfig} from '@constants/entityDetailsConfig/useEntityDetailsConfig';

import {ModalContext} from '@contexts';

import {ConfigurationCard} from '@molecules';
import DeleteEntityModal from '@molecules/DeleteEntityModal';

import {useEntityDetailsPick} from '@store/entityDetails';

const Delete: React.FC = () => {
  const {entity, details} = useEntityDetailsPick('entity', 'details');
  const {defaultStackRoute, label, useDeleteEntity} = useEntityDetailsConfig(entity);
  const {setModalConfig, setModalOpen} = useContext(ModalContext);

  if (!entity || !details) {
    return null;
  }

  const onConfirm = () => {
    setModalConfig({
      title: `Delete this ${label}`,
      width: 600,
      content: (
        <DeleteEntityModal
          defaultStackRoute={defaultStackRoute}
          useDeleteMutation={useDeleteEntity}
          name={details.name}
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
        description={`The ${label} will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone.`}
        onConfirm={onConfirm}
        isWarning
        confirmButtonText="Delete"
        forceEnableButtons
      />
    </Form>
  );
};

export default Delete;
