import {ReactComponent as WizardHintImage} from '@assets/wizardHint.svg';

import {StyledWizardButton, StyledWizardHintContainer, WizardHintList, WizardHintText} from '../../Wizard.styled';

const SecondStepHint = (
  <StyledWizardHintContainer>
    <WizardHintImage />
    <WizardHintText>Reuse values and protect sensitive data.</WizardHintText>
    <WizardHintList>
      <li>Store sensitive data in variable type secret to keep its values hidden on the screen.</li>
      <li>Use variable type basic to set the value to be visible as plain text.</li>
    </WizardHintList>
    <StyledWizardButton>Learn more</StyledWizardButton>
  </StyledWizardHintContainer>
);

export default SecondStepHint;
