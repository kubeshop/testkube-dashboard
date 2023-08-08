import React, {FC, ReactNode, memo} from 'react';

import {Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {CustomText, SummaryGridItem as ItemContainer} from './SummaryGrid.styled';

type SummaryGridProps = {
  title: string;
  value?: ReactNode;
};

const SummaryGridItem: FC<SummaryGridProps> = memo(({title, value}) => (
  <ItemContainer>
    <CustomText title={title} className="uppercase middle" $color={Colors.slate500}>
      {title}
    </CustomText>
    <Title level={3}>{value ?? '-'}</Title>
  </ItemContainer>
));

export default SummaryGridItem;
