import {FC, PropsWithChildren, ReactElement, useContext} from 'react';

import {ReactComponent as CreateTestIcon} from '@assets/create-test.svg';

import {ExternalLink} from '@atoms/ExternalLink';

import {ConfigContext} from '@contexts/ConfigContext';
import {MainContext} from '@contexts/MainContext';

import {Button} from '@custom-antd/Button';
import {Text} from '@custom-antd/Typography/Text';
import {Title} from '@custom-antd/Typography/Title';

import {Permissions, usePermission} from '@permissions/base';

import {Colors} from '@styles/Colors';

import {StyledEmptyListContainer} from './EmptyListContent.styled';
import {HelpCard} from './HelpCard';
import {StyledHelpCardsContainer, StyledLastHelpCardContainer} from './HelpCard.styled';

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

export const EmptyListContent: FC<PropsWithChildren<EmptyListContentProps>> = props => {
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
  const {isClusterAvailable} = useContext(MainContext);
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
          <Button $customType="primary" onClick={onButtonClick} disabled={!isClusterAvailable}>
            {buttonText}
          </Button>
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
