import styled from 'styled-components';

import Colors from '@styles/Colors';

const Asterisk = styled.span`
  &::after {
    content: '*';
    margin: 0 4px;
  }

  color: ${Colors.rose500};
`;

export default Asterisk;
