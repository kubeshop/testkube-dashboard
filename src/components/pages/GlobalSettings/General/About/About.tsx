import {FullWidthSpace, Text} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import Colors from '@styles/Colors';

import {AboutInfoGrid, AboutInfoGridItem} from './About.styled';

const About: React.FC = () => {
  return (
    <ConfigurationCard title="About" description="About description">
      <FullWidthSpace size={32} direction="vertical">
        <AboutInfoGrid>
          <AboutInfoGridItem>
            <Text className="regular middle" color={Colors.slate400}>
              Connection status
            </Text>
            <Text className="regular middle">Some version</Text>
          </AboutInfoGridItem>
        </AboutInfoGrid>
      </FullWidthSpace>
    </ConfigurationCard>
  );
};

export default About;
