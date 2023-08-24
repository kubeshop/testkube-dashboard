import {useEffect} from 'react';

import {Title} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import useURLSearchParams from '@hooks/useURLSearchParams';

import {saveApiEndpoint} from '@services/apiEndpoint';

import {EndpointProcessingContainer} from './EndpointProcessing.styled';

const EndpointProcessing: React.FC = () => {
  const searchParams = useURLSearchParams();
  const openMainPage = useDashboardNavigate('/');

  useEffect(() => {
    if (searchParams.apiEndpoint) {
      saveApiEndpoint(searchParams.apiEndpoint.toString());
    }
    openMainPage();
  }, [searchParams]);

  return (
    <EndpointProcessingContainer>
      <Title>Setting endpoint...</Title>
    </EndpointProcessingContainer>
  );
};

export default EndpointProcessing;
