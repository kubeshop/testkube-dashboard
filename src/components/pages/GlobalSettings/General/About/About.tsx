import {FullWidthSpace, Text} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {useApiDetailsField} from '@src/store/apiDetails';

import Colors from '@styles/Colors';

import env from '../../../../../env';

import {AboutInfoGrid, AboutInfoGridItem} from './About.styled';

const About: React.FC = () => {
  const [data] = useApiDetailsField('data');

  return (
    <ConfigurationCard title="Versions" description="Your current versions">
      <FullWidthSpace size={32} direction="vertical">
        <AboutInfoGrid>
          <AboutInfoGridItem>
            <Text className="regular middle" color={Colors.slate400}>
              API Version
            </Text>
            <Text className="regular middle">{data.version}</Text>
          </AboutInfoGridItem>
          <AboutInfoGridItem>
            <Text className="regular middle" color={Colors.slate400}>
              Dashboard Version
            </Text>
            <Text className="regular middle">{env.version}</Text>
          </AboutInfoGridItem>
          <AboutInfoGridItem>
            <Text className="regular middle" color={Colors.slate400}>
              Helm Chart Version
            </Text>
            <Text className="regular middle">{data.helmchartVersion}</Text>
          </AboutInfoGridItem>
        </AboutInfoGrid>
      </FullWidthSpace>
    </ConfigurationCard>
  );
};

export default About;
