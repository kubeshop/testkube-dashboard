import {useContext} from 'react';

import {Form} from 'antd';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {ModalContext} from '@contexts';

import {Entity} from '@models/entity';

import {ConfigurationCard} from '@molecules';
import DeleteEntityModal from '@molecules/DeleteEntityModal';

import {useDeleteTestSuiteMutation} from '@services/testSuites';
import {useDeleteTestMutation} from '@services/tests';

import {useEntityDetailsStore} from '@store/entityDetails';

import {namingMap} from '../utils';

const useDeleteMutations: Record<Entity, UseMutation<any>> = {
  'test-suites': useDeleteTestSuiteMutation,
  tests: useDeleteTestMutation,
};

const Delete: React.FC = () => {
  const {entity, details, defaultStackRoute} = useEntityDetailsStore(x => ({
    entity: x.entity,
    details: x.details,
    defaultStackRoute: x.defaultStackRoute,
  }));
  const {setModalConfig, setModalOpen} = useContext(ModalContext);

  if (!entity || !details) {
    return null;
  }

  const onConfirm = () => {
    setModalConfig({
      title: `Delete this ${namingMap[entity]}`,
      width: 600,
      content: (
        <DeleteEntityModal
          defaultStackRoute={defaultStackRoute}
          useDeleteMutation={useDeleteMutations[entity]}
          name={details.name}
          entityLabel={namingMap[entity]}
        />
      ),
    });
    setModalOpen(true);
  };

  return (
    <Form name="delete-entity-form">
      <ConfigurationCard
        title={`Delete this ${namingMap[entity]}`}
        description={`The ${namingMap[entity]} will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone.`}
        onConfirm={onConfirm}
        isWarning
        confirmButtonText="Delete"
        forceEnableButtons
      />
    </Form>
  );
};

export default Delete;
