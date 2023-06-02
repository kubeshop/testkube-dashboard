import {PropsWithChildren} from 'react';

import {Space} from 'antd';

import {Text, Title} from '@custom-antd';

import PageMetadata from '@pages/PageMetadata';

import Colors from '@styles/Colors';

import {PageBlueprintHeader, PageBlueprintWrapper} from './PageBlueprint.styled';

type PageBlueprintProps = {
  title: string;
  description: React.ReactNode;
  headerButton?: React.ReactNode;
};

const PageBlueprint: React.FC<PropsWithChildren<PageBlueprintProps>> = props => {
  const {children, title, description, headerButton} = props;

  return (
    <PageBlueprintWrapper>
      <PageMetadata title={title} description={typeof description === 'string' ? description : undefined} />

      <PageBlueprintHeader>
        <Space direction="vertical" size={15}>
          <Title color={Colors.slate50} ellipsis>
            {title}
          </Title>
          <Text className="regular middle" color={Colors.slate400}>
            {description}
          </Text>
        </Space>
        {headerButton}
      </PageBlueprintHeader>
      {children}
    </PageBlueprintWrapper>
  );
};

export default PageBlueprint;
