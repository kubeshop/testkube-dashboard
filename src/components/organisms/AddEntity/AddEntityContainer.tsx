import React, {useContext} from 'react';

import {AddEntityBlueprint} from '@models/addEntity';
import {WizardType} from '@models/wizard';

import {AddTestWizard} from '@wizards';

import {MainContext} from '@contexts';

import {StyledDashboardBottomGradient, StyledDashboardContent, StyledDashboardGradient} from '../Dashboard.styled';
import DashboardTitle from '../DashboardContent/DashboardTitle';
import {StyledAddEntityContainer} from './AddEntity.styled';

const wizardsMap: {
  [key in WizardType]: React.FC<{
    wizardTitle: string;
    onCancel: () => void;
  }>;
} = {
  addTest: AddTestWizard,
};

const AddEntityContainer: React.FC<AddEntityBlueprint> = props => {
  const {gradient, pageTitle, wizardType, wizardTitle} = props;

  const {navigate} = useContext(MainContext);

  const WizardComponent = wizardsMap[wizardType];

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <StyledAddEntityContainer>
      <StyledDashboardGradient gradient={gradient}>
        <StyledDashboardBottomGradient />
      </StyledDashboardGradient>
      <StyledDashboardContent>
        <DashboardTitle>{pageTitle}</DashboardTitle>
        <WizardComponent wizardTitle={wizardTitle} onCancel={onCancel} />
      </StyledDashboardContent>
    </StyledAddEntityContainer>
  );
};

export default AddEntityContainer;
