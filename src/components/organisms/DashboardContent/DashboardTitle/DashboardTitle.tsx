import {StyledDashboardTitle} from './DashboardTitle.styled';

type DashboardTitleProps = {};

const DashboardTitle: React.FC<DashboardTitleProps> = props => {
  const {children} = props;

  return (
    <StyledDashboardTitle data-cy="dashboard-title" className="dashboard-title">
      {children}
    </StyledDashboardTitle>
  );
};

export default DashboardTitle;
