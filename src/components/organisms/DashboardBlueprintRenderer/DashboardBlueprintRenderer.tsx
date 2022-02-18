import ExecutionsEntity from '@constants/dashboardEntities/executions';
import TestSuiteExecutionsEntity from '@constants/dashboardEntities/testSuiteExecutions';
import TestSuitesEntity from '@constants/dashboardEntities/testSuites';
import ScriptsEntity from '@constants/dashboardEntities/tests';

import {DashboardBlueprint, DashboardBlueprintProps, DashboardBlueprintType} from '@models/dashboard';

import {DashboardContainer} from '@organisms';

const entities: {[key in DashboardBlueprintType]: DashboardBlueprint} = {
  'test-suites': TestSuitesEntity,
  tests: ScriptsEntity,
  executions: ExecutionsEntity,
  'test-executions': TestSuiteExecutionsEntity,
  'test-suite-executions': TestSuiteExecutionsEntity,
};

const DashboardBlueprintRenderer: React.FC<DashboardBlueprintProps> = props => {
  const {entityType} = props;

  return <DashboardContainer {...entities[entityType]} />;
};

export default DashboardBlueprintRenderer;
