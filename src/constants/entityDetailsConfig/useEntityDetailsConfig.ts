import {Entity} from '@models/entity';
import {EntityDetailsBlueprint} from '@models/entityDetails';

import TestDetailsConfig from './TestDetailsConfig';
import TestSuiteDetailsConfig from './TestSuiteDetailsConfig';

const blueprints: Record<Entity, EntityDetailsBlueprint> = {
  tests: TestDetailsConfig,
  'test-suites': TestSuiteDetailsConfig,
};

export const useEntityDetailsConfig = (entity: Entity): EntityDetailsBlueprint => {
  const config = blueprints[entity];
  if (!config) {
    throw new Error('Invalid "entity" passed.');
  }
  return config;
};
