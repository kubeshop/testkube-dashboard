import React, {FC} from 'react';
import {Helmet} from 'react-helmet';

import {useConfigPlugin} from '@plugins/config/hooks';

interface HeadProps {
  title?: string;
  description?: string;
}

const PageMetadata: FC<HeadProps> = ({title, description}) => {
  const mainPageTitle = useConfigPlugin.select(x => x.pageTitle);
  return (
    <Helmet>
      <title>{title ? `${title} | ${mainPageTitle}` : mainPageTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
    </Helmet>
  );
};

export default PageMetadata;
