import {memo} from 'react';

import {ReactComponent as WizardHintImage} from '@assets/wizardHint.svg';
import {ReactComponent as WizardHintEmpty} from '@assets/wizardHintEmpty.svg';

import {ExecutorIcon} from '@atoms';

import {Button, Text, Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {AbsoluteExecutorIconContainer, StyledImageContainer, StyledWizardHintContainer} from './Hint.styled';

export type HintProps = {
  title: string;
  description: string;
  openLink: () => void;
  selectedExecutor?: string;
};

const Hint: React.FC<HintProps> = props => {
  const {title, description, openLink, selectedExecutor} = props;

  return (
    <StyledWizardHintContainer>
      <StyledImageContainer>
        {selectedExecutor ? <WizardHintEmpty /> : <WizardHintImage />}
        {selectedExecutor ? (
          <AbsoluteExecutorIconContainer>
            <ExecutorIcon type={selectedExecutor} />
          </AbsoluteExecutorIconContainer>
        ) : null}
      </StyledImageContainer>
      <Title level={3}>{title}</Title>
      <Text className="regular middle" color={Colors.slate400}>
        {description}
      </Text>
      <Button $customType="secondary" onClick={openLink}>
        Read our documentation
      </Button>
    </StyledWizardHintContainer>
  );
};

export default memo(Hint);
