import TestSuitesEntity from '@constants/entitiesConfig/TestSuitesConfig';

import {Entity, EntityListBlueprint, EntityListBlueprintProps} from '@models/entity';

import {EntityListContainer} from '@organisms';

const entities: Partial<Record<Entity, EntityListBlueprint>> = {
  'test-suites': TestSuitesEntity,
};

const EntityListBlueprintRenderer: React.FC<EntityListBlueprintProps> = props => {
  const {entity} = props;

  return <EntityListContainer {...entities[entity]!} />;
};

export default EntityListBlueprintRenderer;
