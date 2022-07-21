import {ReactComponent as HelpLinkIcon} from '@assets/helpLinkIcon.svg';
import {ReactComponent as LinkIcon} from '@assets/linkIcon.svg';
import {ReactComponent as QuestionCircleIcon} from '@assets/questionCircleIcon.svg';

import {StyledChildrenContainer, StyledHelpCardContainer} from './HelpCard.styled';

type HeypCardTypes = {
  isLink?: boolean;
  isHelp?: boolean;
  children: React.ReactNode;
  link?: string;
};
const HelpCard: React.FC<HeypCardTypes> = props => {
  const {isLink, isHelp, children, link} = props;

  const redirectToLink = () => {
    window.open(link, '_blank');
  };

  return (
    <StyledHelpCardContainer isLink={isLink} onClick={redirectToLink}>
      {isLink ? <HelpLinkIcon /> : null}
      {isHelp ? <QuestionCircleIcon /> : null}
      <StyledChildrenContainer>{children}</StyledChildrenContainer>
      {isLink ? <LinkIcon /> : null}
    </StyledHelpCardContainer>
  );
};

export default HelpCard;
