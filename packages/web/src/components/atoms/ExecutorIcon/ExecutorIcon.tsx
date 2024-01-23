import React from 'react';

import {ReactComponent as ArtilleryIcon} from '@assets/artilleryIcon.svg';
import {ReactComponent as CurlIcon} from '@assets/curlIcon.svg';
import {ReactComponent as CypressIcon} from '@assets/cypressIcon.svg';
import {ReactComponent as GinkgoIcon} from '@assets/ginkgoIcon.svg';
import {ReactComponent as GradleIcon} from '@assets/gradleIcon.svg';
import {ReactComponent as JMeterIcon} from '@assets/jmeterIcon.svg';
import {ReactComponent as K6Icon} from '@assets/k6Icon.svg';
import {ReactComponent as KubepugIcon} from '@assets/kubepug.svg';
import {ReactComponent as MavenIcon} from '@assets/mavenIcon.svg';
import {ReactComponent as PlaywrightIcon} from '@assets/playwrightIcon.svg';
import {ReactComponent as PostmanIcon} from '@assets/postmanIcon.svg';
import {ReactComponent as SoapUIIcon} from '@assets/soapIcon.svg';
import {ReactComponent as DefaultIcon} from '@assets/tests-icon.svg';
import {ReactComponent as TracetestIcon} from '@assets/tracetestIcon.svg';

import {StyledExecutorIcon} from './ExecutorIcon.styled';

type ExecutorIconProps = {
  size?: 'large' | 'small';
  type?: string;
};

export const executorIcons: Record<string, JSX.Element> = {
  postman: <PostmanIcon />,
  cypress: <CypressIcon />,
  curl: <CurlIcon />,
  k6: <K6Icon />,
  soapui: <SoapUIIcon />,
  artillery: <ArtilleryIcon />,
  gradle: <GradleIcon />,
  maven: <MavenIcon />,
  kubepug: <KubepugIcon />,
  ginkgo: <GinkgoIcon />,
  jmeter: <JMeterIcon />,
  playwright: <PlaywrightIcon />,
  tracetest: <TracetestIcon />,
};

const ExecutorIcon: React.FC<ExecutorIconProps> = props => {
  const {size = 'large', type} = props;

  const icon = type ? executorIcons[type] : <DefaultIcon />;

  if (!icon) {
    return <DefaultIcon />;
  }
  return (
    <StyledExecutorIcon $size={size} className="dashboard-test-runner">
      {icon || <DefaultIcon />}
    </StyledExecutorIcon>
  );
};

export default ExecutorIcon;
