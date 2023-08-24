import {FC} from 'react';

import {Button} from '@custom-antd/Button';
import {FormItem} from '@custom-antd/Form/FormItem';
import {Text} from '@custom-antd/Typography/Text';

import {ActionFormItems} from '@organisms/TriggersFormItems/ActionFormItems';

import {StyledButtonsContainer, StyledStepDescription} from '@pages/Triggers/TriggersList/AddTriggerModal.styled';

import {Colors} from '@styles/Colors';

import {StepsEnum} from './types';

type ModalSecondStepProps = {
  setCurrentStep: (step: StepsEnum) => void;
  isLoading: boolean;
};

export const ModalSecondStep: FC<ModalSecondStepProps> = props => {
  const {isLoading, setCurrentStep} = props;

  return (
    <>
      <StyledStepDescription>
        <Text color={Colors.slate400} className="regular middle">
          Define the action to be performed on testkube once the conditions are met.
        </Text>
      </StyledStepDescription>
      <ActionFormItems />
      <FormItem shouldUpdate>
        {({isFieldsTouched}) => (
          <StyledButtonsContainer>
            <Button
              $customType="secondary"
              onClick={() => {
                setCurrentStep(StepsEnum.condition);
              }}
            >
              Back
            </Button>
            <Button
              htmlType="submit"
              $customType="primary"
              loading={isLoading}
              disabled={!isFieldsTouched() || isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </StyledButtonsContainer>
        )}
      </FormItem>
    </>
  );
};
