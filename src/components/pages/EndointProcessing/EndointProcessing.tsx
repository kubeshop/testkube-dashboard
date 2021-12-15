import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {Title} from '@atoms';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {config} from '@src/constants/config';

import {EndpointProcessingContainer} from './EnpointProcessing.styled';

const EndointProcessing = () => {
  const searchParams = useURLSearchParams();

  const history = useHistory();

  useEffect(() => {
    if (searchParams.apiEndpoint) {
      localStorage.setItem(config.apiEndpoint, searchParams.apiEndpoint.toString());
    }

    history.push('/');
  }, [searchParams]);

  return (
    <EndpointProcessingContainer>
      <Title>Setting endpoint...</Title>
    </EndpointProcessingContainer>
  );
};

export default EndointProcessing;
