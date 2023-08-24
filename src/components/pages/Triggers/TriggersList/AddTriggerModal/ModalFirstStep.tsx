import {FC} from 'react';

import {Form} from 'antd';

import {Button} from '@custom-antd/Button';
import {Text} from '@custom-antd/Typography/Text';

import {ConditionFormItems} from '@organisms/TriggersFormItems/ConditionFormItems';

import {StyledStepDescription} from '@pages/Triggers/TriggersList/AddTriggerModal.styled';

import {Colors} from '@styles/Colors';

import {StepsEnum} from './types';

type ModalFirstStepProps = {
  setCurrentStep: (step: StepsEnum) => void;
  setFirstStepValues: (values: any) => void;
};

export const ModalFirstStep: FC<ModalFirstStepProps> = props => {
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
