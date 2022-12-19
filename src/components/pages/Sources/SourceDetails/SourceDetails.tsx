import {useContext, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';

import {Tabs} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource, setCurrentSource} from '@redux/reducers/sourcesSlice';

import {useGetSourceDetailsQuery} from '@services/sources';

import {MainContext} from '@contexts';

import {StyledContainer, StyledPageHeader} from './SourceDetails.styled';
import SourceSettings from './SourceSettings';

const SourceDetails = () => {
  const {navigate, location, dispatch} = useContext(MainContext);

  const currentSourceDetails = useAppSelector(selectCurrentSource);

  const name = location.pathname.split('/')[2];

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: sourceDetails, refetch} = useGetSourceDetailsQuery(name);

  const isPageDisabled = !name;

  useEffect(() => {
    if (sourceDetails) {
      dispatch(setCurrentSource(sourceDetails));
    }
  }, [sourceDetails]);

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <StyledContainer>
      <Helmet>
        <title>{`${name} | Sources | Testkube`}</title>
      </Helmet>
      <StyledPageHeader onBack={() => navigate('/sources')} title={name} className="testkube-pageheader" />
      <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} destroyInactiveTabPane>
        <Tabs.TabPane tab="Settings" key="Settings" disabled={isPageDisabled}>
          {currentSourceDetails ? <SourceSettings /> : null}
        </Tabs.TabPane>
      </Tabs>
    </StyledContainer>
  );
};

export default SourceDetails;
