import React from 'react';

import {LoadingOutlined} from '@ant-design/icons';
import {Space} from 'antd';

import {Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {HeaderContainer} from './EntityListContent.styled';

type EntityListHeaderProps = {
  title: React.ReactNode | string;
  description: React.ReactNode | string;
  loading?: boolean;
};

const EntityListHeader: React.FC<EntityListHeaderProps> = props => {
  const {title, loading, description} = props;
  return (
    <HeaderContainer>
      <Space size={15} direction="vertical">
        <Title color={Colors.slate50} ellipsis>
          {title}
          {loading ? (
            <>
              {' '}
              <LoadingOutlined />
            </>
          ) : null}
        </Title>
        {description}
      </Space>
    </HeaderContainer>
  );
};

export default React.memo(EntityListHeader);
