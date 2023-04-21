import {PropsWithChildren} from 'react';

import {ReactComponent as HelpLinkIcon} from '@assets/helpLinkIcon.svg';
import {ReactComponent as LinkIcon} from '@assets/linkIcon.svg';
import {ReactComponent as QuestionCircleIcon} from '@assets/questionCircleIcon.svg';

import {IconWrapper, StyledChildrenContainer, StyledHelpCardContainer} from './HelpCard.styled';

type HelpCardTypes = {
  isLink?: boolean;
  isHelp?: boolean;
  link?: string;
  customLinkIcon?: any;
};
const HelpCard: React.FC<PropsWithChildren<HelpCardTypes>> = props => {
  const {isLink, isHelp, children, link, customLinkIcon: CustomLinkIcon} = props;

  const redirectToLink = () => {
    window.open(link, '_blank');
  };

  return (
    <StyledHelpCardContainer isLink={Boolean(link)} onClick={redirectToLink}>
      {isLink && !CustomLinkIcon ? (
        <IconWrapper>
          <HelpLinkIcon />
        </IconWrapper>
      ) : null}
      {isHelp ? (
        <IconWrapper>
          <QuestionCircleIcon />
        </IconWrapper>
      ) : null}
      <StyledChildrenContainer>{children}</StyledChildrenContainer>
      {isLink ? <IconWrapper>{CustomLinkIcon || <LinkIcon />}</IconWrapper> : null}
    </StyledHelpCardContainer>
  );
};

export default HelpCard;
