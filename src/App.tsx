import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {useGA4React} from 'ga-4-react';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';
import {setLabels} from '@redux/reducers/labelsSlice';

import {SideBar} from '@organisms';

import {PollingIntervals} from '@utils/numbers';

import {useGetLabelsQuery} from '@services/labels';

import {MainContext} from '@contexts';

import {StyledLayoutContentWrapper} from './App.styled';
import {CookiesBanner} from './components/molecules';
import Routes from './routes';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const ga4React = useGA4React();
  const location = useLocation();
  const navigate = useNavigate();

  const apiEndpoint = useAppSelector(selectApiEndpoint);

  const [isCookiesVisible, setCookiesVisibility] = useState(!localStorage.getItem('isGADisabled'));

  const {data: labelsMap, refetch} = useGetLabelsQuery(null, {pollingInterval: PollingIntervals.long});

  useEffect(() => {
    refetch();
  }, [apiEndpoint]);

  useEffect(() => {
    if (labelsMap) {
      dispatch(setLabels(labelsMap));
    }
  }, [labelsMap]);

  useEffect(() => {
    if (ga4React) {
      ga4React.pageview(location.pathname);
    }
  }, [location.pathname]);

  const onAcceptCookies = () => {
    // @ts-ignore
    window[`ga-disable-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`] = false;
    localStorage.setItem('isGADisabled', '0');
    setCookiesVisibility(false);
  };

  const onDeclineCookies = (args?: {skipGAEvent?: boolean}) => {
    if (!args?.skipGAEvent && ga4React) {
      ga4React.gtag('event', 'disable_analytics', {disable_analytics: true});
    }

    // @ts-ignore
    window[`ga-disable-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`] = true;
    localStorage.setItem('isGADisabled', '1');
    setCookiesVisibility(false);
  };

  useEffect(() => {
    const isGADisabled = Boolean(Number(localStorage.getItem('isGADisabled')));

    if (isGADisabled) {
      onDeclineCookies({skipGAEvent: true});
    }
  }, []);

  useEffect(() => {
    if (ga4React) {
      ga4React.gtag('event', 'user_info', {api_host: window.location.host, os: window.navigator.userAgent});
    }
  }, [ga4React]);

  const mainContextValue = {
    ga4React,
    dispatch,
    location,
    navigate,
  };

  return (
    <MainContext.Provider value={mainContextValue}>
      <Layout>
        <SideBar />
        <StyledLayoutContentWrapper>
          <Content>
            <Routes />
          </Content>
        </StyledLayoutContentWrapper>
        {isCookiesVisible ? (
          <CookiesBanner onAcceptCookies={onAcceptCookies} onDeclineCookies={onDeclineCookies} />
        ) : null}
      </Layout>
    </MainContext.Provider>
  );
};

export default App;
