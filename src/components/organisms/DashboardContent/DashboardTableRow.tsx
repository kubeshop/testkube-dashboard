import {LabelsList} from '@molecules';

import {
  StyledDashboardTableRow,
  StyledTableRowLeftPartContainer, // StyledTableRowRightPartContainer,
  StyledTableRowTitle,
} from './DashboardContent.styled';

const DashboardTableRow: React.FC<any> = props => {
  const {name, labels} = props;

  return (
    <StyledDashboardTableRow>
      <StyledTableRowLeftPartContainer isNameOnly={!labels}>
        <StyledTableRowTitle>{name}</StyledTableRowTitle>
        {labels ? <LabelsList labels={labels} shouldSkipLabels /> : null}
      </StyledTableRowLeftPartContainer>
      {/* <StyledTableRowRightPartContainer></StyledTableRowRightPartContainer> */}
    </StyledDashboardTableRow>
  );
};

export default DashboardTableRow;
