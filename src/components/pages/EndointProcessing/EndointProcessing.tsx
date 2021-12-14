import {useLocation, useParams} from 'react-router-dom';

import {Title} from '@atoms';

const EndointProcessing = () => {
  const location = useLocation();
  const params = useParams();

  return <Title>Endpoint processing</Title>;
};

export default EndointProcessing;
