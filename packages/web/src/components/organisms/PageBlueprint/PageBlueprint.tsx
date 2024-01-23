import {PropsWithChildren} from 'react';

import PageMetadata from '@pages/PageMetadata';

import {PageWrapper} from './PageBlueprint.styled';
import PageHeader from './PageHeader';

type PageBlueprintProps = {
  title: string;
  description?: React.ReactNode;
  headerButton?: React.ReactNode;
};

const PageBlueprint: React.FC<PropsWithChildren<PageBlueprintProps>> = props => {
  const {children, title, description, headerButton} = props;

  return (
    <PageWrapper>
      <PageMetadata title={title} description={typeof description === 'string' ? description : undefined} />
      <PageHeader title={title} description={description} extra={headerButton} />
      {children}
    </PageWrapper>
  );
};

export default PageBlueprint;
