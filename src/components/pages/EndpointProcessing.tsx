import {FC, useEffect} from 'react';

import {Title} from '@custom-antd/Typography/Title';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {useURLSearchParams} from '@hooks/useURLSearchParams';

import {saveApiEndpoint} from '@services/apiEndpoint';

import {EndpointProcessingContainer} from './EndpointProcessing.styled';

export const EndpointProcessing: FC = () => {
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
