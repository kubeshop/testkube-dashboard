import {FC} from 'react';

import Error from '../Error';

const NotFound: FC = () => (
  <Error title="Page not found" description="We weren’t able to find the page you requested." />
);

export default NotFound;
