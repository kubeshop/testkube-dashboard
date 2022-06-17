import {openCustomExecutorDocumentation} from '@utils/externalLinks';

import {ReactComponent as WizardHintImage} from '@assets/wizardHint.svg';

import {StyledWizardButton, StyledWizardHintContainer, WizardHintText} from '../Wizard.styled';

const WizardHint: React.FC = () => {
  return (
    <StyledWizardHintContainer>
      <WizardHintImage />
      <WizardHintText>Don’t see your test type listed?</WizardHintText>
      <WizardHintText fontWeight={300} fontSize={14}>
        Add an executor using our Testkube template.
      </WizardHintText>
      <StyledWizardButton onClick={openCustomExecutorDocumentation}>Here is how!</StyledWizardButton>
    </StyledWizardHintContainer>
  );
};

export default WizardHint;
