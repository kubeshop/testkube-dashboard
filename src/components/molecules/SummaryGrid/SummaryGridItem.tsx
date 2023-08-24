import React, {FC, ReactNode, memo} from 'react';

import {Title} from '@custom-antd/Typography/Title';

import {CustomText, SummaryGridItem as ItemContainer} from '@molecules/SummaryGrid.styled';

import {Colors} from '@styles/Colors';

type SummaryGridProps = {
  title: string;
  value?: ReactNode;
};

export const SummaryGridItem: FC<SummaryGridProps> = memo(({title, value}) => (
  <ItemContainer>
    <CustomText title={title} className="uppercase middle" $color={Colors.slate500}>
      {title}
    </CustomText>
    <Title level={3}>{value ?? '-'}</Title>
  </ItemContainer>
));
