import {FC, memo} from 'react';

import {ReactComponent as WizardHintImage} from '@assets/wizardHint.svg';
import {ReactComponent as WizardHintEmpty} from '@assets/wizardHintEmpty.svg';

import {ExecutorIcon} from '@atoms/ExecutorIcon';

import {Button} from '@custom-antd/Button';
import {Text} from '@custom-antd/Typography/Text';
import {Title} from '@custom-antd/Typography/Title';

import {Colors} from '@styles/Colors';

import {AbsoluteExecutorIconContainer, StyledImageContainer, StyledWizardHintContainer} from './Hint.styled';

export type HintProps = {
  title: string;
  description: string;
  openLink: () => void;
  selectedExecutor?: string;
};

export const Hint: FC<HintProps> = memo(props => {
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
});
