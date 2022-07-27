import {useContext} from 'react';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

const TestSuiteExecutionDetailsStatus: React.FC = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {stepResults, status} = data;

  return <div>dass</div>;
};

export default TestSuiteExecutionDetailsStatus;
