import {PropsWithChildren, useContext} from 'react';
import {Helmet} from 'react-helmet';

import {Space} from 'antd';

import {ConfigContext} from '@contexts';

import {Text, Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {PageBlueprintHeader, PageBlueprintWrapper} from './PageBlueprint.styled';

type PageBlueprintProps = {
  title: string;
  description: React.ReactNode;
  headerButton?: React.ReactNode;
};

const PageBlueprint: React.FC<PropsWithChildren<PageBlueprintProps>> = props => {
  const {children, title, description, headerButton} = props;
  const {pageTitle} = useContext(ConfigContext);

  return (
    <PageBlueprintWrapper>
      <Helmet>
        <title>{`${title} | ${pageTitle}`}</title>
        <meta name="description" content={`${description}`} />
      </Helmet>
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
