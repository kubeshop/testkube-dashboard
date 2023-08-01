import useRunEntity from '@hooks/useRunEntity';

import {PageWrapper} from '@organisms';

import PageMetadata from '@pages/PageMetadata';

import {useEntityDetailsPick} from '@store/entityDetails';

import EntityDetailsContentHeader from './EntityDetailsContentHeader';
import EntityDetailsContentTabs from './EntityDetailsContentTabs';
import SummaryGrid from './SummaryGrid';

const EntityDetailsContent: React.FC = () => {
  const {entity, details, metrics} = useEntityDetailsPick('entity', 'details', 'metrics');

  const name = details?.name;
  const description = details?.description;

  const [isRunning, run] = useRunEntity(entity, details);

  return (
    <PageWrapper>
      <PageMetadata title={name} description={description} />

      <EntityDetailsContentHeader onRun={run} isRunning={isRunning} />
      <SummaryGrid metrics={metrics} />
      <EntityDetailsContentTabs onRun={run} />
    </PageWrapper>
  );
};

export default EntityDetailsContent;
