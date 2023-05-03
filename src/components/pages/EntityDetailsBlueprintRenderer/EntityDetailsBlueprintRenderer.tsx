import React from 'react';

import TestDetailsConfig from '@constants/entityDetailsConfig/TestDetailsConfig';
import TestSuiteDetailsConfig from '@constants/entityDetailsConfig/TestSuiteDetailsConfig';

import {Entity} from '@models/entity';
import {EntityDetailsBlueprint} from '@models/entityDetails';

import {EntityDetailsContainer} from '@organisms';

const entities: Record<Entity, EntityDetailsBlueprint> = {
  'test-suites': TestSuiteDetailsConfig,
  tests: TestDetailsConfig,
};

const EntityDetailsBlueprintRenderer: React.FC<{entity: Entity}> = props => {
  const {entity} = props;

  return <EntityDetailsContainer {...entities[entity]} />;
};

export default EntityDetailsBlueprintRenderer;
