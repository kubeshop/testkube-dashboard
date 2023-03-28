import {useContext, useEffect} from 'react';

import {Title} from '@custom-antd';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {hasProtocol} from '@utils/strings';

import {MainContext} from '@contexts';

import {saveApiEndpoint} from '@services/apiEndpoint';

import {EndpointProcessingContainer} from './EndpointProcessing.styled';

const EndpointProcessing: React.FC = () => {
  const {dispatch, navigate} = useContext(MainContext);

  const searchParams = useURLSearchParams();

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
      const validatedApiEndpoint = validateApiEndpoint(searchParams.apiEndpoint.toString());
      saveApiEndpoint(validatedApiEndpoint);
    }

    navigate('/');
  }, [searchParams]);

  return (
    <EndpointProcessingContainer>
      <Title>Setting endpoint...</Title>
    </EndpointProcessingContainer>
  );
};

export default EndpointProcessing;
