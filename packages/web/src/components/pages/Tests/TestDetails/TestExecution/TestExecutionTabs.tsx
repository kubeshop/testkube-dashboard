import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {Execution} from '@models/execution';

import {useTestsSlot} from '@plugins/tests-and-test-suites/hooks';

import {useExecutionDetailsPick} from '@store/executionDetails';

const TestExecutionTabs: React.FC = () => {
  const {data: execution} = useExecutionDetailsPick('data') as {data: Execution};
  const {id: entityId, execDetailsTab} = useParams();

  const {id} = execution;

  const setExecutionTab = useDashboardNavigate((next: string) => `/tests/${entityId}/executions/${id}/${next}`);

  const items = useTestsSlot('testExecutionTabs');

  return <Tabs defaultActiveKey="log-output" activeKey={execDetailsTab} onChange={setExecutionTab} items={items} />;
};

export default TestExecutionTabs;
