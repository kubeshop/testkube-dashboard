import {Button, Text, Title} from '@custom-antd';

import {ReactComponent as WizardHintImage} from '@assets/wizardHint.svg';

import Colors from '@styles/Colors';

import {StyledWizardHintContainer} from './Hint.styled';

type HintProps = {
  title: string;
  description: string;
  openLink: () => void;
};

const Hint: React.FC<HintProps> = props => {
  const {title, description, openLink} = props;

  return (
    <StyledWizardHintContainer>
      <WizardHintImage />
      <Title level={3}>{title}</Title>
      <Text className="regular middle" color={Colors.slate400}>
        {description}
      </Text>
      <Button $customType="secondary" onClick={openLink}>
        Learn how
      </Button>
    </StyledWizardHintContainer>
  );
};

export default Hint;
