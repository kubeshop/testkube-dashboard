import React, {ReactElement} from 'react';

import {CreationBlueprintProps, CreationBlueprintType} from '@models/creation';

import AddTest from '../AddTest';

const creationComponent: {[key in CreationBlueprintType]: ReactElement} = {
  test: <AddTest />,
};

const CreationBlueprintRenderer: React.FC<CreationBlueprintProps> = props => {
  const {entityType} = props;

  return creationComponent[entityType];
};

export default CreationBlueprintRenderer;
