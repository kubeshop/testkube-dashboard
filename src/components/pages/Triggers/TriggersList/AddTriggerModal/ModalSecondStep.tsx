import {Form} from 'antd';

import {Button, Text} from '@src/components/custom-antd';

// import {ActionFormItems} from '@src/components/organisms';
import Colors from '@styles/Colors';

import {StepsEnum} from './AddTriggerModal';
import {StyledButtonsContainer, StyledStepDescription} from './AddTriggerModal.styled';

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
      {/* <ActionFormItems /> */}
      <Form.Item style={{marginBottom: 0}} shouldUpdate>
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
            <Button htmlType="submit" $customType="primary" loading={isLoading} disabled={!isFieldsTouched()}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </StyledButtonsContainer>
        )}
      </Form.Item>
    </>
  );
};

export default ModalSecondStep;
