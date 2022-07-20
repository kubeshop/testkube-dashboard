import TestExecutionsConfig from '@constants/entityExecutionsConfig/TestExecutionsConfig';
import TestSuiteExecutionsConfig from '@constants/entityExecutionsConfig/TestSuiteExecutionsConfig';

import {EntityExecutionsContainer} from '@organisms';

const entities: any = {
  'test-suites': TestSuiteExecutionsConfig,
  tests: TestExecutionsConfig,
};

const EntityExecutionsBlueprintRenderer: React.FC<any> = props => {
  const {entity} = props;

  return <EntityExecutionsContainer {...entities[entity]} />;
};

export default EntityExecutionsBlueprintRenderer;
