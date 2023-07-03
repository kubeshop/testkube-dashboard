import {useContext} from 'react';

import {EntityDetailsContext} from '@contexts';

import {Definition} from '@molecules';

import {testkubeCRDBases} from '@utils/externalLinks';

import {settingsDefinitionData} from './utils';

const SourceDefinition = () => {
  const {entityDetails, entity} = useContext(EntityDetailsContext);

  const sectionData = settingsDefinitionData[entity];

  return (
    <Definition
      useGetDefinitionQuery={sectionData.query}
      useUpdateDefinitionMutation={sectionData.mutation}
      label={entity.slice(0, -1)}
      name={entityDetails.name}
      crdUrl={testkubeCRDBases[entity]}
    />
  );
};

export default SourceDefinition;
