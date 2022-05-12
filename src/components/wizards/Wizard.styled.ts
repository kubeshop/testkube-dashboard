import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledWizardContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 1240px;
  padding: 45px 25px 25px 25px;
  border: 1px solid #262626;
  border-radius: 14px;

  background: ${Colors.greyBGSecondary};
`;

export const StyledWizardTitle = styled.span`
  display: block;

  margin: 0px 0px 0px 24px;
  padding-bottom: 45px;

  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;

  /* Gray / gray-9 */

  color: #dbdbdb;
`;

export const StyledWizardBody = styled.div`
  display: flex;
  flex: 1;

  min-height: 550px;
  border-radius: 4px;
`;

export const StyledWizardForm = styled.div`
  flex: 4;

  padding: 30px 45px 30px 25px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  background: #262626;
`;

export const StyledWizardHintContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;

  padding: 60px 20px 20px 20px;

  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  background: #303030;
`;

export const WizardHintText = styled.span`
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 32px;
  /* or 200% */

  text-align: center;

  /* Gray / gray-9 */

  color: #dbdbdb;
`;

export const StyledWizardFooter = styled.div`
  padding: 24px;
`;
