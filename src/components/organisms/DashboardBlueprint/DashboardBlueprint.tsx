import {useMemo} from 'react';

import ExecutionsEntity from '@constants/dashboardEntities/executions';
import ScriptsEntity from '@constants/dashboardEntities/scripts';
import TestsEntity from '@constants/dashboardEntities/tests';

import {DashboardBlueprintProps, DashboardEntity, DashboardEntityType} from '@models/dashboard';

const entities: {[key in DashboardEntityType]: DashboardEntity} = {
  tests: TestsEntity,
  scripts: ScriptsEntity,
  executions: ExecutionsEntity,
};

const DashboardBlueprint: React.FC<DashboardBlueprintProps> = props => {
  const {entityType} = props;

  const renderedView = useMemo(() => entities[entityType], [entityType]);

  const {component: Component, ...rest} = renderedView;

  return <Component {...rest} />;
};

export default DashboardBlueprint;
