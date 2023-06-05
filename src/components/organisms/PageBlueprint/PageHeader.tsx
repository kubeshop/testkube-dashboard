import React, {FC, PropsWithChildren, ReactNode, memo} from 'react';

import {LoadingOutlined} from '@ant-design/icons';
import {Space} from 'antd';

import {Text, Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledPageHeader} from './PageBlueprint.styled';

interface PageHeaderProps {
  title: string;
  description?: ReactNode;
  buttons?: ReactNode;
  loading?: boolean;
}

const PageHeader: FC<PropsWithChildren<PageHeaderProps>> = ({title, description, buttons, loading, children}) => (
  <StyledPageHeader>
    <Space direction="vertical" size={15}>
      <Title color={Colors.slate50} ellipsis>
        {title}
        {loading ? (
          <>
            {' '}
            <LoadingOutlined />
          </>
        ) : null}
      </Title>
      {description ? (
        <Text className="regular middle" color={Colors.slate400}>
          {description}
        </Text>
      ) : null}
      {children}
    </Space>
    {buttons ? <div>{buttons}</div> : null}
  </StyledPageHeader>
);

export default memo(PageHeader);
