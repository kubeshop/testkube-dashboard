import {ReactComponent as WizardHintImage} from '@assets/wizardHint.svg';

import {StyledWizardHintContainer, WizardHintText} from '../Wizard.styled';

const WizardHint: React.FC = () => {
  return (
    <StyledWizardHintContainer>
      <WizardHintImage />
      <WizardHintText>Don’t see your test type listed?</WizardHintText>
      <WizardHintText>Add an executor using our Testkube template.</WizardHintText>
      <WizardHintText>Here’s how!</WizardHintText>
    </StyledWizardHintContainer>
  );
};

export default WizardHint;
