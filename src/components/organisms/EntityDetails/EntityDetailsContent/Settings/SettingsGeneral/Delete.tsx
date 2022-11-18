import {useContext, useState} from 'react';

import {Entity} from '@models/entity';
import {UseMutationType} from '@models/rtk';

import {Modal} from '@custom-antd';

import {ConfigurationCard} from '@molecules';
import DeleteEntityModal from '@molecules/DeleteEntityModal';

import {useDeleteTestSuiteMutation} from '@services/testSuites';
import {useDeleteTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};

const useDeleteMutations: {[key in Entity]: UseMutationType} = {
  'test-suites': useDeleteTestSuiteMutation,
  tests: useDeleteTestMutation,
};

const Delete: React.FC = () => {
  const {entity, entityDetails, defaultStackRoute} = useContext(EntityDetailsContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!entity || !entityDetails) {
    return null;
  }

  const onConfirm = () => {
    setIsModalVisible(true);
  };
  return (
    <>
      <ConfigurationCard
        title={`Delete this ${namingMap[entity]}`}
        description="The test suite will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone."
        onConfirm={onConfirm}
        isWarning
        confirmButtonText="Delete"
        isButtonsDisabled={false}
      />
      {isModalVisible ? (
        <Modal
          title={`Delete this ${namingMap[entity]}`}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          content={
            <DeleteEntityModal
              defaultStackRoute={defaultStackRoute}
              useDeleteMutation={useDeleteMutations[entity]}
              name={entityDetails.name}
              entityLabel={namingMap[entity]}
            />
          }
        />
      ) : null}
    </>
  );
};

export default Delete;
