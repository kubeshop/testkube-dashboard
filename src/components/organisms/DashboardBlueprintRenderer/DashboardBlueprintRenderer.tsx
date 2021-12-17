import {useMemo} from 'react';

import ExecutionsEntity from '@constants/dashboardEntities/executions';
import ScriptsEntity from '@constants/dashboardEntities/scripts';
import TestsEntity from '@constants/dashboardEntities/tests';

import {DashboardBlueprint, DashboardBlueprintProps, DashboardBlueprintType} from '@models/dashboard';

const entities: {[key in DashboardBlueprintType]: DashboardBlueprint} = {
  tests: TestsEntity,
  scripts: ScriptsEntity,
  executions: ExecutionsEntity,
};

const DashboardBlueprintRenderer: React.FC<DashboardBlueprintProps> = props => {
  const {entityType} = props;

  const renderedView = useMemo(() => entities[entityType], [entityType]);

  const {component: Component, ...rest} = renderedView;

  return <Component {...rest} />;
};

export default DashboardBlueprintRenderer;
