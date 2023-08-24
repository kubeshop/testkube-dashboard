import {FC, PropsWithChildren, ReactNode} from 'react';

import {PageMetadata} from '@pages/PageMetadata';

import {PageWrapper} from './PageBlueprint.styled';
import {PageHeader} from './PageBlueprint/PageHeader';

type PageBlueprintProps = {
  title: string;
  description: ReactNode;
  headerButton?: ReactNode;
};

export const PageBlueprint: FC<PropsWithChildren<PageBlueprintProps>> = props => {
  const {children, title, description, headerButton} = props;

  return (
    <PageWrapper>
      <PageMetadata title={title} description={typeof description === 'string' ? description : undefined} />
      <PageHeader title={title} description={description} extra={headerButton} />
      {children}
    </PageWrapper>
  );
};
