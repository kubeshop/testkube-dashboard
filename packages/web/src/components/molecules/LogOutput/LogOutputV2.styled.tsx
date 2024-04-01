import styled from 'styled-components';

import Colors from '@src/styles/Colors';

export const SourceList = styled.ul<{$open?: boolean; $root?: boolean}>`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  ${({$open}) => ($open ? 'flex: 1;' : '')}
  ${({$root}) => ($root ? 'height: 100%;' : '')}
`;

export const SourceSection = styled.li<{$open?: boolean}>`
  border: 1px solid ${Colors.slate700};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  ${({$open}) =>
    $open
      ? 'flex: 1;'
      : `
    ${SourceContent} {
      display: none;
    }
  `}
`;

export const SourceContent = styled.div<{$empty?: boolean}>`
  position: relative;
  display: flex;
  align-items: stretch;
  margin: 0;
  background: ${Colors.slate900};
  min-height: 300px;
  flex: 1;

  ${({$empty}) => ($empty ? 'min-height: 80px;' : '')}
`;

export const SourceHeader = styled.header`
  display: flex;
  align-items: center;
  background: ${Colors.slate900};
  padding: 10px 16px;
  gap: 16px;
  user-select: none;
  cursor: pointer;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
