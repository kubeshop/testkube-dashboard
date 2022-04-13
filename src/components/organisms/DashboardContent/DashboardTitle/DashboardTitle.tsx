import {StyledDashboardTitle} from './DashboardTitle.styled';

type DashboardTitleProps = {};

const DashboardTitle: React.FC<DashboardTitleProps> = props => {
  const {children} = props;

  return <StyledDashboardTitle className="dashboard-title">{children}</StyledDashboardTitle>;
};

export default DashboardTitle;
