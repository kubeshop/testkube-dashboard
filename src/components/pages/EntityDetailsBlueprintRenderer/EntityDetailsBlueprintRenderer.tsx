import {FC} from 'react';

import {Entity} from '@models/entity';

import {EntityDetailsContainer} from '@organisms';

const EntityDetailsBlueprintRenderer: FC<{entity: Entity}> = ({entity}) => <EntityDetailsContainer entity={entity} />;

export default EntityDetailsBlueprintRenderer;
