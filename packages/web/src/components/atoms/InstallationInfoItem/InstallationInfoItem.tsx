import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import * as S from './InstallationInfoItem.styled';

type InstallationInfoItemProps = {
  label: string;
  value?: string;
};

const InstallationInfoItem: React.FC<InstallationInfoItemProps> = props => {
  const {label, value} = props;

  return (
    <S.Container>
      <Text className="regular middle" color={Colors.slate400}>
        {label}
      </Text>

      <Text className="regular middle">{value}</Text>
    </S.Container>
  );
};

export default InstallationInfoItem;
