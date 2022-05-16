import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledAddEntityContainer = styled.div`
  position: relative;
  overflow: auto;

  display: flex;
  flex-direction: column;
  flex: 1;

  height: 100%;
  padding: 0;
`;

export const AddEntityWizardContainer = styled.div`
  max-width: 1240px;
  height: calc(100% - 250px);
  border: 1px solid ${Colors.grey3};
  border-radius: 16px;

  background: ${Colors.greyBGSecondary};
`;
