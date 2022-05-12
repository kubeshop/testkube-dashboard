import React from 'react';
import {useNavigate} from 'react-router-dom';

import {AddEntityBlueprint} from '@models/addEntity';

import {AddTestWizard} from '@wizards';

import {StyledDashboardBottomGradient, StyledDashboardContent, StyledDashboardGradient} from '../Dashboard.styled';
import DashboardTitle from '../DashboardContent/DashboardTitle';
import {StyledAddEntityContainer} from './AddEntity.styled';

const wizardsMap: {
  [key in 'addTest']: React.FC<{
    wizardTitle: string;
    onCancel?: (args?: any) => any;
    onSave?: (args?: any) => any;
    onRun?: (args?: any) => any;
  }>;
} = {
  addTest: AddTestWizard,
};

const AddEntityContainer: React.FC<AddEntityBlueprint> = props => {
  const {gradient, pageTitle, wizardType, wizardTitle, onSave, onCancel, onRun} = props;

  const WizardComponent = wizardsMap[wizardType];

  const navigate = useNavigate();

  const onCancelFallback = () => {
    navigate(-1);
  };

  const onSaveFallback = async (values: any) => {
    try {
      const res = console.log();
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const onRunFallback = async (values: any) => {
    console.log('values: ', values);
  };

  return (
    <StyledAddEntityContainer>
      <StyledDashboardGradient gradient={gradient}>
        <StyledDashboardBottomGradient />
      </StyledDashboardGradient>
      <StyledDashboardContent>
        <DashboardTitle>{pageTitle}</DashboardTitle>
        <WizardComponent
          wizardTitle={wizardTitle}
          onSave={onSave || onSaveFallback}
          onCancel={onCancel || onCancelFallback}
          onRun={onRun || onRunFallback}
        />
      </StyledDashboardContent>
    </StyledAddEntityContainer>
  );
};

export default AddEntityContainer;
