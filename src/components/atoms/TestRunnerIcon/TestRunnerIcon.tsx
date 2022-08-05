import React from 'react';

import {TestExecutor} from '@models/testExecutors';

import {ReactComponent as ArtilleryIcon} from '@assets/artilleryIcon.svg';
import {ReactComponent as CurlIcon} from '@assets/curlIcon.svg';
import {ReactComponent as CypressIcon} from '@assets/cypressIcon.svg';
import {ReactComponent as GinkgoIcon} from '@assets/ginkgoIcon.svg';
import {ReactComponent as GradleIcon} from '@assets/gradleIcon.svg';
import {ReactComponent as K6Icon} from '@assets/k6Icon.svg';
import {ReactComponent as KubepugIcon} from '@assets/kubepug.svg';
import {ReactComponent as MavenIcon} from '@assets/mavenIcon.svg';
import {ReactComponent as PostmanIcon} from '@assets/postmanIcon.svg';
import {ReactComponent as SoapUIIcon} from '@assets/soapIcon.svg';
import {ReactComponent as DefaultIcon} from '@assets/tests-icon.svg';

import {StyledTestRunnerIcon} from './TestRunnerIcon.styled';

type TestRunnerIconProps = {
  icon: TestExecutor;
  noWidth?: boolean;
};

export const testRunnerIcons: {[key in TestExecutor]: any} = {
  'postman/collection': <PostmanIcon />,
  'postman/custom': <PostmanIcon />,
  'cypress/project': <CypressIcon />,
  'curl/test': <CurlIcon />,
  'test/curl': <CurlIcon />,
  'k6/script': <K6Icon />,
  'soapui/xml': <SoapUIIcon />,
  'artillery/test': <ArtilleryIcon />,
  'gradle/test': <GradleIcon />,
  'gradle:jdk18/test': <GradleIcon />,
  'maven:jdk18/test': <MavenIcon />,
  'maven/test': <MavenIcon />,
  'kubepug/yaml': <KubepugIcon />,
  'ginkgo/test': <GinkgoIcon />,
  unknown: <DefaultIcon />,
};

const TestRunnerIcon: React.FC<TestRunnerIconProps> = props => {
  const {icon, noWidth = false} = props;

  const renderIcon = icon ? testRunnerIcons[icon] : <DefaultIcon />;

  return <StyledTestRunnerIcon $noWidth={noWidth}>{renderIcon}</StyledTestRunnerIcon>;
};

export default TestRunnerIcon;
