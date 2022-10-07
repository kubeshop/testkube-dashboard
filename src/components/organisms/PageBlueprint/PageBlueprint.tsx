import {Space} from 'antd';

import {Text, Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {PageBlueprintHeader, PageBlueprintWrapper} from './PageBlueprint.styled';

type PageBlueprintProps = {
  children: React.ReactNode;
  title: string;
  description: React.ReactNode;
};

const PageBlueprint: React.FC<PageBlueprintProps> = props => {
  const {children, title, description} = props;

  return (
    <PageBlueprintWrapper>
      <PageBlueprintHeader>
        <Space direction="vertical" size={15}>
          <Title color={Colors.slate50} ellipsis>
            {title}
          </Title>
          <Text className="regular middle" color={Colors.slate400}>
            {description}
          </Text>
        </Space>
      </PageBlueprintHeader>
      {children}
    </PageBlueprintWrapper>
  );
};

export default PageBlueprint;
