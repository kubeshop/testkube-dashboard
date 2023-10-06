import {Button, FormItem, Text} from '@custom-antd';

import {ActionFormItems} from '@organisms';

import Colors from '@styles/Colors';

import {StyledButtonsContainer, StyledStepDescription} from './AddTriggerModal.styled';
import {StepsEnum} from './types';

type ModalSecondStepProps = {
  setCurrentStep: (step: StepsEnum) => void;
  isLoading: boolean;
};

const ModalSecondStep: React.FC<ModalSecondStepProps> = props => {
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
              data-test="webhooks-add-modal-back:second"
              $customType="secondary"
              onClick={() => {
                setCurrentStep(StepsEnum.condition);
              }}
            >
              Back
            </Button>
            <Button
              data-test="webhooks-add-modal-next:second"
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

export default ModalSecondStep;
