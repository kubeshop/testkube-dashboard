import React from 'react';

import {Space} from 'antd';

import {Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {HeaderContainer} from './EntityListContent.styled';

const EntityListHeader: React.FC<{pageTitle: React.ReactNode | string; children: React.ReactNode}> = props => {
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
