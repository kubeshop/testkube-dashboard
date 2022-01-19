import ExecutionsEntity from '@constants/dashboardEntities/executions';
import ScriptsEntity from '@constants/dashboardEntities/scripts';
import TestExecutionsEntity from '@constants/dashboardEntities/testExecutions';
import TestsEntity from '@constants/dashboardEntities/tests';

import {DashboardBlueprint, DashboardBlueprintProps, DashboardBlueprintType} from '@models/dashboard';

import {DashboardContainer} from '@organisms';

const entities: {[key in DashboardBlueprintType]: DashboardBlueprint} = {
  tests: TestsEntity,
  scripts: ScriptsEntity,
  executions: ExecutionsEntity,
  'test-executions': TestExecutionsEntity,
};

const DashboardBlueprintRenderer: React.FC<DashboardBlueprintProps> = props => {
  const {entityType} = props;

  return <DashboardContainer {...entities[entityType]} />;
};

export default DashboardBlueprintRenderer;
