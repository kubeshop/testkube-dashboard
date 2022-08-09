import React from 'react';

import {Entity} from '@models/entity';
import {EntityDetailsBlueprint} from '@models/entityDetails';

import {EntityDetailsContainer} from '@organisms';

import TestDetailsConfig from '@src/constants/entityDetailsConfig/TestDetailsConfig';
import TestSuiteDetailsConfig from '@src/constants/entityDetailsConfig/TestSuiteDetailsConfig';

const entities: {[key in Entity]: EntityDetailsBlueprint} = {
  'test-suites': TestSuiteDetailsConfig,
  tests: TestDetailsConfig,
};

const EntityDetailsBlueprintRenderer: React.FC<{entity: Entity}> = props => {
  const {entity} = props;

  return <EntityDetailsContainer {...entities[entity]} />;
};

export default EntityDetailsBlueprintRenderer;
