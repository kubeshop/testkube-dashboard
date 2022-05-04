import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {useGA4React} from 'ga-4-react';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';
import {setLabels} from '@redux/reducers/labelsSlice';

import {SideBar} from '@organisms';

import {PollingIntervals} from '@utils/numbers';

import {useGetLabelsQuery} from '@services/labels';

import {StyledLayoutContentWrapper} from './App.styled';
import {CookiesBanner} from './components/molecules';
import Routes from './routes';

const App = () => {
  const [isCookiesVisible, setCookiesVisibility] = useState(!localStorage.getItem('isGADisabled'));
  const apiEndpoint = useAppSelector(selectApiEndpoint);
  const dispatch = useAppDispatch();

  const ga4React = useGA4React();

  const {data: labelsMap, refetch} = useGetLabelsQuery(null, {pollingInterval: PollingIntervals.long});

  const {pathname} = useLocation();

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
      ga4React.pageview(pathname);
    }
  }, [pathname]);

  const onAcceptCookies = () => {
    // @ts-ignore
    window[`ga-disable-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`] = false;
    localStorage.setItem('isGADisabled', '0');
    setCookiesVisibility(false);
  };

  const onDeclineCookies = () => {
    // @ts-ignore
    window[`ga-disable-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`] = true;
    localStorage.setItem('isGADisabled', '1');
    setCookiesVisibility(false);
  };

  useEffect(() => {
    const isGADisabled = Boolean(Number(localStorage.getItem('isGADisabled')));

    if (isGADisabled) {
      onDeclineCookies();
    }
  }, []);

  return (
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
  );
};

export default App;
