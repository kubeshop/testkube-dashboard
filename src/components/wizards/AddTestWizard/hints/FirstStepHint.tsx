import {Text, Title} from '@custom-antd';

import {openCustomExecutorDocumentation} from '@utils/externalLinks';

import {ReactComponent as WizardHintImage} from '@assets/wizardHint.svg';

import Colors from '@styles/Colors';

import {StyledWizardButton, StyledWizardHintContainer} from '../../Wizard.styled';

const FirstStepHint = (
  <StyledWizardHintContainer>
    <WizardHintImage />
    <Title level={3}>Missing a test type?</Title>
    <Text className="regular middle" color={Colors.slate200}>
      Add test types through testkube executors.
    </Text>
    <StyledWizardButton onClick={openCustomExecutorDocumentation}>Learn how</StyledWizardButton>
  </StyledWizardHintContainer>
);

export default FirstStepHint;
