import {useState} from 'react';

import {Form} from 'antd';

import {Modal} from '@custom-antd';

import {ConfigurationCard, DeleteEntityModal} from '@molecules';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource} from '@redux/reducers/sourcesSlice';

import {useDeleteSourceMutation} from '@services/sources';

const Delete: React.FC = () => {
  const source = useAppSelector(selectCurrentSource);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onConfirm = () => {
    setIsModalVisible(true);
  };

  return (
    <Form name="delete-source-form">
      <ConfigurationCard
        title="Delete this source"
        description="This source will be permanently deleted. All your tests linked to this source will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
        onConfirm={onConfirm}
        isWarning
        confirmButtonText="Delete"
        forceEnableButtons
      />
      {isModalVisible ? (
        <Modal
          title="Delete this source?"
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          content={
            <DeleteEntityModal
              defaultStackRoute="/sources"
              useDeleteMutation={useDeleteSourceMutation}
              name={source?.name || ''}
              entityLabel="source"
            />
          }
        />
      ) : null}
    </Form>
  );
};

export default Delete;
