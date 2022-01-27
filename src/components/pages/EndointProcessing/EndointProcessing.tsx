import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {config} from '@constants/config';

import {useAppDispatch} from '@redux/hooks';
import {setApiEndpoint} from '@redux/reducers/configSlice';

import {Title} from '@atoms';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {hasProtocol} from '@utils/strings';

import {EndpointProcessingContainer} from './EnpointProcessing.styled';

const EndointProcessing = () => {
  const dispatch = useAppDispatch();

  const searchParams = useURLSearchParams();

  const navigate = useNavigate();

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

      localStorage.setItem(config.apiEndpoint, validatedApiEndpoint);
      dispatch(setApiEndpoint(validatedApiEndpoint));
    }

    navigate('/');
  }, [searchParams]);

  return (
    <EndpointProcessingContainer>
      <Title>Setting endpoint...</Title>
    </EndpointProcessingContainer>
  );
};

export default EndointProcessing;
