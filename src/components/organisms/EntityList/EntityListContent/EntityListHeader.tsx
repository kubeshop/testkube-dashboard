import React, {PropsWithChildren} from 'react';

import {Space} from 'antd';

import {Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {HeaderContainer} from './EntityListContent.styled';

type EntityListHeaderProps = {
  pageTitle: React.ReactNode | string;
};

const EntityListHeader: React.FC<PropsWithChildren<EntityListHeaderProps>> = props => {
  const {pageTitle, children} = props;
  return (
    <HeaderContainer>
      <Space size={15} direction="vertical">
        <Title color={Colors.slate50} ellipsis>
          {pageTitle}
        </Title>
        {children}
      </Space>
    </HeaderContainer>
  );
};

export default React.memo(EntityListHeader);
