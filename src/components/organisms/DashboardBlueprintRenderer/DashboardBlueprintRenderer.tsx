import ExecutionsEntity from '@constants/dashboardEntities/executions';
import TestSuiteExecutionsEntity from '@constants/dashboardEntities/testSuiteExecutions';
import TestSuitesEntity from '@constants/dashboardEntities/testSuites';
import TestsEntity from '@constants/dashboardEntities/tests';

import {DashboardBlueprint, DashboardBlueprintProps, DashboardBlueprintType} from '@models/dashboard';

import {DashboardContainer} from '@organisms';

const entities: {[key in DashboardBlueprintType]: DashboardBlueprint} = {
  'test-suites': TestSuitesEntity,
  tests: TestsEntity,
  executions: ExecutionsEntity,
  'test-suite-executions': TestSuiteExecutionsEntity,
};

const DashboardBlueprintRenderer: React.FC<DashboardBlueprintProps> = props => {
  const {entityType} = props;

  return <DashboardContainer {...entities[entityType]} />;
};

export default DashboardBlueprintRenderer;
