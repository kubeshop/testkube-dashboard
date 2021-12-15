import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {config} from '@constants/config';

import {Title} from '@atoms';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {hasProtocol} from '@utils/strings';

import {EndpointProcessingContainer} from './EnpointProcessing.styled';

const EndointProcessing = () => {
  const searchParams = useURLSearchParams();

  const history = useHistory();

  const validateApiEndpoint = (apiEndpoint: string) => {
    if (hasProtocol(apiEndpoint)) {
      return apiEndpoint;
    }

    if (apiEndpoint.startsWith('localhost')) {
      return `http://${apiEndpoint}`;
    }

    return apiEndpoint;
  };

  useEffect(() => {
    if (searchParams.apiEndpoint) {
      localStorage.setItem(config.apiEndpoint, validateApiEndpoint(searchParams.apiEndpoint.toString()));
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
