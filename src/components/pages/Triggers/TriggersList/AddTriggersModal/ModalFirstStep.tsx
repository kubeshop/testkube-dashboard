import {Form} from 'antd';

import {Button, Text} from '@custom-antd';

import {ConditionFormItems} from '@organisms';

import Colors from '@styles/Colors';

import {StepsEnum} from './AddTriggerModal';
import {StyledStepDescription} from './AddTriggersModal.styled';

type ModalFirstStepProps = {
  setCurrentStep: (step: StepsEnum) => void;
  setFirstStepValues: (values: any) => void;
};

const ModalFirstStep: React.FC<ModalFirstStepProps> = props => {
  const {setFirstStepValues, setCurrentStep} = props;

  return (
    <>
      <StyledStepDescription>
        <Text color={Colors.slate400} className="regular middle">
          Define the conditions to be met for the trigger to be called.
        </Text>
      </StyledStepDescription>
      <ConditionFormItems />
      <Form.Item
        style={{
          textAlign: 'end',
          marginBottom: 0,
        }}
        shouldUpdate
      >
        {({getFieldsValue, validateFields}) => (
          <Button
            $customType="primary"
            onClick={() => {
              validateFields().then(() => {
                setCurrentStep(StepsEnum.action);
                setFirstStepValues(getFieldsValue());
              });
            }}
          >
            Next
          </Button>
        )}
      </Form.Item>
    </>
  );
};

export default ModalFirstStep;
