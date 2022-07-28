import {Entity} from '@src/models/entity';

export const getDefinition = (entity: Entity, entityDetails: any) => {
  if (entity === 'tests') {
    return entityDetails?.content.data;
  }

  if (entity === 'test-suites') {
    return 'tbd';
  }
};
