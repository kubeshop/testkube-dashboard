import ThirdStepImage from '@assets/addTestThirdStepImage.png';

import {openTestkubeDashboardDocumentation} from '@src/utils/externalLinks';

import {StyledWizardButton, StyledWizardHintContainer, StyledWizardImage, WizardHintText} from '../../Wizard.styled';

const ThirdStepHint = (
  <StyledWizardHintContainer>
    <WizardHintText>Get to know your Testkube commands!</WizardHintText>
    <WizardHintText fontWeight={300} fontSize={14}>
      You’ll find helpful commands by clicking on your test and navigating to the CLI Commands tab.
    </WizardHintText>
    <StyledWizardButton onClick={openTestkubeDashboardDocumentation}>Learn more</StyledWizardButton>
    <StyledWizardImage src={ThirdStepImage} />
  </StyledWizardHintContainer>
);

export default ThirdStepHint;
