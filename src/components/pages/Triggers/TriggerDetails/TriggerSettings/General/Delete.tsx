import {useState} from 'react';

import {Form} from 'antd';

import {Modal} from '@custom-antd';

import {ConfigurationCard, DeleteEntityModal} from '@molecules';

import {useDeleteTriggerMutation} from '@services/triggers';

import {useShallowGlobalStore} from '@store/GlobalStore';

const Delete: React.FC = () => {
  const {currentTrigger} = useShallowGlobalStore(state => ({
    currentTrigger: state.currentTrigger!,
  }));

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onConfirm = () => {
    setIsModalVisible(true);
  };

  return (
    <Form name="delete-trigger-form">
      <ConfigurationCard
        title="Delete this trigger"
        description="This trigger will be permanently deleted. All your automation linked to this trigger will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
        onConfirm={onConfirm}
        isWarning
        confirmButtonText="Delete"
        forceEnableButtons
      />
      {isModalVisible ? (
        <Modal
          title="Delete this trigger?"
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          content={
            <DeleteEntityModal
              defaultStackRoute="/triggers"
              useDeleteMutation={useDeleteTriggerMutation}
              name={currentTrigger.name || ''}
              entityLabel="triggers"
            />
          }
        />
      ) : null}
    </Form>
  );
};

export default Delete;
