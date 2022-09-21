import {useContext, useState} from 'react';

import {Entity} from '@models/entity';
import {ModalConfigProps} from '@models/modal';

import {Modal} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {EntityDetailsContext} from '@contexts';

import {TestDeleteModalConfig, TestSuiteDeleteModalConfig} from './deleteUtils/utils';

const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};

const modalTypes: {[key in Entity]: ModalConfigProps} = {
  'test-suites': TestSuiteDeleteModalConfig,
  tests: TestDeleteModalConfig,
};

const Delete: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!entity || !entityDetails) {
    return null;
  }

  const onConfirm = () => {
    setIsModalVisible(true);
  };

  const creationModalConfig: ModalConfigProps = modalTypes[entity];

  return (
    <>
      <ConfigurationCard
        title={`Delete this ${namingMap[entity]}`}
        description="The test suite will be permanently deleted, including its deployments analytical history. This action is irreversible and can not be undone."
        onConfirm={onConfirm}
        isWarning
        confirmButtonText="Delete"
      />
      {isModalVisible ? (
        <Modal {...creationModalConfig} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
      ) : null}
    </>
  );
};

export default Delete;
