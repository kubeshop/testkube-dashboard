import TestExecutionsConfig from '@constants/entityExecutionsConfig/TestExecutionsConfig';
import TestSuiteExecutionsConfig from '@constants/entityExecutionsConfig/TestSuiteExecutionsConfig';

import {Entity} from '@models/entity';

import {EntityExecutionsContainer} from '@organisms';

const entities: any = {
  'test-suites': TestSuiteExecutionsConfig,
  tests: TestExecutionsConfig,
};

const EntityExecutionsBlueprintRenderer: React.FC<{entity: Entity}> = props => {
  const {entity} = props;

  return <EntityExecutionsContainer {...entities[entity]} />;
};

export default EntityExecutionsBlueprintRenderer;
