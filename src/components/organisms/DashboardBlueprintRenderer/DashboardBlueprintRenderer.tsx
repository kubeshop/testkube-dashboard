import ExecutionsEntity from '@constants/dashboardEntities/executions';
import TestExecutionsEntity from '@constants/dashboardEntities/testExecutions';
import ScriptsEntity from '@constants/dashboardEntities/tests';
import TestsSuitesEntity from '@constants/dashboardEntities/testsSuites';

import {DashboardBlueprint, DashboardBlueprintProps, DashboardBlueprintType} from '@models/dashboard';

import {DashboardContainer} from '@organisms';

const entities: {[key in DashboardBlueprintType]: DashboardBlueprint} = {
  'tests-suites': TestsSuitesEntity,
  tests: ScriptsEntity,
  executions: ExecutionsEntity,
  'test-executions': TestExecutionsEntity,
};

const DashboardBlueprintRenderer: React.FC<DashboardBlueprintProps> = props => {
  const {entityType} = props;

  return <DashboardContainer {...entities[entityType]} />;
};

export default DashboardBlueprintRenderer;
