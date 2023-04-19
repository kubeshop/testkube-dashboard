import {ReactElement, useContext} from 'react';

import {ExternalLink} from '@atoms';

import {Button, Text, Title} from '@custom-antd';

import {HelpCard} from '@molecules';
import {StyledHelpCardsContainer, StyledLastHelpCardContainer} from '@molecules/HelpCard/HelpCard.styled';

import {ReactComponent as CreateTestIcon} from '@assets/create-test.svg';

import Colors from '@styles/Colors';

import {Permissions, usePermission} from '@permissions/base';

import {MainContext} from '@contexts';

import {StyledEmptyListContainer} from './EmptyListContent.styled';

type EmptyListContentProps = {
  title: string;
  description: string | ReactElement;
  buttonText: string;
  onButtonClick?: () => void;
  children?: React.ReactNode;
  emptyListReadonlyTitle?: string;
  emptyListReadonlyDescription?: string;
};

const EmptyListContent: React.FC<EmptyListContentProps> = props => {
  const {
    title,
    description,
    onButtonClick,
    children,
    buttonText,
    emptyListReadonlyTitle,
    emptyListReadonlyDescription,
  } = props;

  const {isClusterAvailable} = useContext(MainContext);
  const isActionAvailable = usePermission(Permissions.runEntity);

  return (
    <StyledEmptyListContainer size={24} direction="vertical">
      {isActionAvailable ? (
        <>
          <CreateTestIcon />
          <Title className="text-center">{title}</Title>
          <Text className="regular middle text-center" color={Colors.slate400}>
            {description}
          </Text>
          <Button $customType="primary" onClick={onButtonClick} disabled={!isClusterAvailable}>
            {buttonText}
          </Button>
          <StyledHelpCardsContainer>
            {children}
            <StyledLastHelpCardContainer>
              <HelpCard isHelp link="https://discord.com/invite/hfq44wtR6Q">
                Need help getting started? Want to talk to Testkube engineers?{' '}
                <ExternalLink href="https://discord.com/invite/hfq44wtR6Q">Find us on Discord</ExternalLink>
              </HelpCard>
            </StyledLastHelpCardContainer>
          </StyledHelpCardsContainer>
        </>
      ) : (
        <>
          <CreateTestIcon />
          <Title className="text-center">{emptyListReadonlyTitle}</Title>
          <Text className="regular middle text-center" color={Colors.slate400}>
            {emptyListReadonlyDescription}
          </Text>
        </>
      )}
    </StyledEmptyListContainer>
  );
};

export default EmptyListContent;
