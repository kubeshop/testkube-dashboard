import {useState} from 'react';

import {TestsView} from '@models/test';

import TestsList from './TestsList';
import TestsTable from './TestsTable';

const TestsPage: React.FC = () => {
  const [view, setView] = useState<TestsView>(TestsView.LIST);

  if (view === TestsView.LIST) {
    return <TestsList />;
  }

  if (view === TestsView.TABLE) {
    return <TestsTable />;
  }

  return null;
};

export default TestsPage;
