import {AddTest} from '@constants/createEntities/test';

import {AddEntityBlueprint} from '@models/addEntity';
import {DashboardBlueprintType} from '@models/dashboard';

import AddEntityContainer from './AddEntityContainer';

const entities: {[key in DashboardBlueprintType]: AddEntityBlueprint} = {
  tests: AddTest,
  'test-suites': AddTest,
};

const AddEntityBlueprintRenderer: React.FC<AddEntityBlueprint> = props => {
  const {entityType} = props;

  return <AddEntityContainer {...entities[entityType]} />;
};

export default AddEntityBlueprintRenderer;
