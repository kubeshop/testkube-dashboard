import {useState} from 'react';

import {Form} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor} from '@redux/reducers/executorsSlice';

import {Modal} from '@custom-antd';

import {ConfigurationCard, DeleteEntityModal} from '@molecules';

import {useDeleteExecutorMutation} from '@services/executors';

const Delete: React.FC = () => {
  const executor = useAppSelector(selectCurrentExecutor);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onConfirm = () => {
    setIsModalVisible(true);
  };

  return (
    <Form name="delete-executor-form">
      <ConfigurationCard
        title="Delete this executor"
        description="The executor will be permanently deleted. All your tests will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
        onConfirm={onConfirm}
        isWarning
        confirmButtonText="Delete"
      />
      {isModalVisible ? (
        <Modal
          title="Delete this executor?"
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          content={
            <DeleteEntityModal
              defaultStackRoute="/executors"
              useDeleteMutation={useDeleteExecutorMutation}
              name={executor?.name || ''}
              entityLabel="executor"
            />
          }
        />
      ) : null}
    </Form>
  );
};

export default Delete;
