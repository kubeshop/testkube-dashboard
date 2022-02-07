import {StyledTableActionsDropdownContainer} from './TableActionsDropdownContainer.styled';

const TableActionsDropdownContainer: React.FC<any> = props => {
  const {children, isDropdownVisible} = props;

  return (
    <StyledTableActionsDropdownContainer
      className="table-actions-dropdown-container"
      isDropdownVisible={isDropdownVisible}
    >
      {children}
    </StyledTableActionsDropdownContainer>
  );
};

export default TableActionsDropdownContainer;
