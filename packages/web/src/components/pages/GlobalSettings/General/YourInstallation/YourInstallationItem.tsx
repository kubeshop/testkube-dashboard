import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {YourInstallationItemContainer} from './YourInstallation.styled';

type YourInstallationItemProps = {
  label: string;
  value?: string;
};

const YourInstallationItem: React.FC<YourInstallationItemProps> = props => {
  const {label, value} = props;
  return (
    <YourInstallationItemContainer>
      <Text className="regular middle" color={Colors.slate400}>
        {label}
      </Text>
      <Text className="regular middle">{value}</Text>
    </YourInstallationItemContainer>
  );
};

export default YourInstallationItem;
