import React from 'react';

import {StyledDashboardTitle} from './DashboardTitle.styled';

type DashboardTitleProps = {
  children: any;
};

const DashboardTitle: React.FC<DashboardTitleProps> = props => {
  const {children} = props;

  return (
    <StyledDashboardTitle data-cy="dashboard-title" className="dashboard-title">
      {children}
    </StyledDashboardTitle>
  );
};

export default DashboardTitle;
