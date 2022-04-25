import {TestExecutor} from '@models/testExecutors';

import {ReactComponent as CurlIcon} from '@assets/curlIcon.svg';
import {ReactComponent as CypressIcon} from '@assets/cypressIcon.svg';
import {ReactComponent as K6Icon} from '@assets/k6Icon.svg';
import {ReactComponent as PostmanIcon} from '@assets/postmanIcon.svg';
import {ReactComponent as SoapUIIcon} from '@assets/soapIcon.svg';
import {ReactComponent as UnknownIcon} from '@assets/unknownIcon.svg';

import {StyledTestRunnerIcon} from './TestRunnerIcon.styled';

type TestRunnerIconProps = {
  icon: TestExecutor;
};

export const testRunnerIcons: {[key in TestExecutor]: any} = {
  'postman/collection': <PostmanIcon />,
  'postman/custom': <PostmanIcon />,
  'cypress/project': <CypressIcon />,
  'curl/test': <CurlIcon />,
  'test/curl': <CurlIcon />,
  'k6/script': <K6Icon />,
  'soapui/xml': <SoapUIIcon />,
  unknown: <UnknownIcon />,
};

const TestRunnerIcon: React.FC<TestRunnerIconProps> = props => {
  const {icon} = props;

  return <StyledTestRunnerIcon>{testRunnerIcons[icon]}</StyledTestRunnerIcon>;
};

export default TestRunnerIcon;
