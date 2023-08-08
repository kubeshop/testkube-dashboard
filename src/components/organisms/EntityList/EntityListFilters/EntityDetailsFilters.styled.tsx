import styled from 'styled-components';

export const FiltersContainer = styled.div<{isMobile: boolean}>`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  ${props => (props.isMobile ? `width: 100%;` : '')}
`;
