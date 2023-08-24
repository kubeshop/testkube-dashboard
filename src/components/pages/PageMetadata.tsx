import React, {FC, useContext} from 'react';
import {Helmet} from 'react-helmet';

import {ConfigContext} from '@contexts/ConfigContext';

interface HeadProps {
  title?: string;
  description?: string;
}

export const PageMetadata: FC<HeadProps> = ({title, description}) => {
  const {pageTitle: mainPageTitle} = useContext(ConfigContext);
  return (
    <Helmet>
      <title>{title ? `${title} | ${mainPageTitle}` : mainPageTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
    </Helmet>
  );
};
