import {PropsWithChildren, ReactElement, useContext} from 'react';

import {ReactComponent as CreateTestIcon} from '@assets/create-test.svg';

import {ExternalLink} from '@atoms';

import {ConfigContext} from '@contexts';

import {Button, Text, Title} from '@custom-antd';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {HelpCard} from '@molecules';
import {StyledHelpCardsContainer, StyledLastHelpCardContainer} from '@molecules/HelpCard/HelpCard.styled';

import {Permissions, usePermission} from '@permissions/base';

import Colors from '@styles/Colors';

import {StyledEmptyListContainer} from './EmptyListContent.styled';

type EmptyListContentProps = {
  title: string;
  description: string | ReactElement;
  buttonText: string;
  onButtonClick?: () => void;
  emptyListReadonlyTitle?: string;
  emptyListReadonlyDescription?: string;
  actionType: 'create' | 'run';
};

const actionTypeToPermission: Record<EmptyListContentProps['actionType'], Permissions> = {
  create: Permissions.createEntity,
  run: Permissions.runEntity,
};

const EmptyListContent: React.FC<PropsWithChildren<EmptyListContentProps>> = props => {
  const {
    title,
    description,
    onButtonClick,
    children,
    buttonText,
    emptyListReadonlyTitle,
    emptyListReadonlyDescription,
    actionType,
  } = props;

  const {discordUrl} = useContext(ConfigContext);
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);
  const isActionAvailable = usePermission(actionTypeToPermission[actionType]);

  return (
    <StyledEmptyListContainer size={24} direction="vertical">
      {isActionAvailable ? (
        <>
          <CreateTestIcon />
          <Title className="text-center">{title}</Title>
          <Text className="regular middle text-center" color={Colors.slate400}>
            {description}
          </Text>
          {isClusterAvailable ? (
            <Button $customType="primary" onClick={onButtonClick}>
              {buttonText}
            </Button>
          ) : null}
          <StyledHelpCardsContainer>
            {children}
            <StyledLastHelpCardContainer>
              <HelpCard isHelp link={discordUrl}>
                Need help getting started? Want to talk to Testkube engineers?{' '}
                <ExternalLink href={discordUrl}>Find us on Discord</ExternalLink>
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
