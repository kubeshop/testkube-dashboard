import React, {FC, useContext} from 'react';
import {Helmet} from 'react-helmet';

import {ConfigContext} from '@contexts';

interface HeadProps {
  title?: string;
  description?: string;
}

const Head: FC<HeadProps> = ({title, description}) => {
  const {pageTitle: mainPageTitle} = useContext(ConfigContext);
  return (
    <Helmet>
      <title>{title ? `${title} | ${mainPageTitle}` : mainPageTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
    </Helmet>
  );
};

export default Head;
