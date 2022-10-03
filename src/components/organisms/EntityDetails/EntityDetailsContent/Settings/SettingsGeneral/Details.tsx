import {useContext, useState} from 'react';

import {Entity} from '@models/entity';
import {Modal} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {EntityDetailsContext} from '@contexts';

import {TestModalConfig} from './EntityCreationModal/ModalConfig';

const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};;

const Details: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!entity || !entityDetails) {
    return null;
  }
  const isTest = namingMap[entity] === 'test';

  const onConfirm = () => {
    setIsModalVisible(true);
  };

  return (
    <>
     {isTest ? (
        <ConfigurationCard
        title={`Update this ${namingMap[entity]}`}
        description="Update test based on test content or git based data"
        onConfirm={onConfirm}
        confirmButtonText="Update"
      />
      ) : null}
      {isModalVisible ? (
        <Modal {...TestModalConfig} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
      ) : null}
    </>
  );
};

export default Details;
