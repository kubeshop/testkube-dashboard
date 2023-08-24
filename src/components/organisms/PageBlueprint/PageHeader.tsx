import {Children, FC, ReactNode, memo} from 'react';

import {LoadingOutlined} from '@ant-design/icons';
import {PageHeaderProps as AntdPageHeaderProps} from 'antd';

import {FullWidthSpace} from '@custom-antd/FullWidthSpace';
import {Text} from '@custom-antd/Typography/Text';

import {PageTitle, StyledPageHeader} from '@organisms/PageBlueprint.styled';

import {Colors} from '@styles/Colors';

type PageHeaderProps = {
  pageTitleAddon?: ReactNode;
  description?: ReactNode;
  loading?: boolean;
} & AntdPageHeaderProps;

export const PageHeader: FC<PageHeaderProps> = memo(
  ({title, pageTitleAddon, description, loading, children, ...props}) => (
    <StyledPageHeader
      {...props}
      title={
        loading ? (
          <>
            {title} <LoadingOutlined />
          </>
        ) : (
          <PageTitle>
            {title} {pageTitleAddon}
          </PageTitle>
        )
      }
    >
      {Children.count(children) > 0 || description ? (
        <FullWidthSpace direction="vertical" size={15}>
          {description ? (
            <Text className="regular middle" color={Colors.slate400}>
              {description}
            </Text>
          ) : null}
          {children}
        </FullWidthSpace>
      ) : null}
    </StyledPageHeader>
  )
);
