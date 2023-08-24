import {FC} from 'react';

import {Text} from '@custom-antd/Typography/Text';

import {YourInstallationItemContainer} from '@pages/GlobalSettings/General/YourInstallation.styled';

import {Colors} from '@styles/Colors';

type YourInstallationItemProps = {
  label: string;
  value?: string;
};

export const YourInstallationItem: FC<YourInstallationItemProps> = props => {
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
