import {useContext, useEffect} from 'react';

import {DashboardContext} from '@contexts';

import {Title} from '@custom-antd';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {saveApiEndpoint} from '@services/apiEndpoint';

import {EndpointProcessingContainer} from './EndpointProcessing.styled';

const EndpointProcessing: React.FC = () => {
  const {navigate} = useContext(DashboardContext);

  const searchParams = useURLSearchParams();

  useEffect(() => {
    if (searchParams.apiEndpoint) {
      saveApiEndpoint(searchParams.apiEndpoint.toString());
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
