import {useState} from 'react';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor} from '@redux/reducers/executorsSlice';

import {Modal} from '@custom-antd';

import {ConfigurationCard, DeleteEntityModal} from '@molecules';

import {useDeleteExecutorMutation} from '@src/services/executors';

const Delete: React.FC = () => {
  const executor = useAppSelector(selectCurrentExecutor);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onConfirm = () => {
    setIsModalVisible(true);
  };

  return (
    <>
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
    </>
  );
};

export default Delete;
