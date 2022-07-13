import TestSuitesEntity from '@constants/entitiesConfig/TestSuitesConfig';
import TestsEntity from '@constants/entitiesConfig/TestsConfig';

import {Entity, EntityListBlueprint, EntityListBlueprintProps} from '@models/entity';

import {EntityListContainer} from '@organisms';

const entities: {[key in Entity]: EntityListBlueprint} = {
  'test-suites': TestSuitesEntity,
  tests: TestsEntity,
};

const EntityListBlueprintRenderer: React.FC<EntityListBlueprintProps> = props => {
  const {entity} = props;

  return <EntityListContainer {...entities[entity]} />;
};

export default EntityListBlueprintRenderer;
