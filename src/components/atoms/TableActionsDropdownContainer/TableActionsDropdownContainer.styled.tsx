import styled from 'styled-components';

export const StyledTableActionsDropdownContainer = styled.div<{isDropdownVisible: boolean}>`
  display: ${props => (props.isDropdownVisible ? 'block' : 'none')};
`;
