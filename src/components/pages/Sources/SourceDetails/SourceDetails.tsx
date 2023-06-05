import {useContext, useEffect, useState} from 'react';

import {Tabs} from 'antd';

import {DashboardContext, MainContext} from '@contexts';

import useLocation from '@hooks/useLocation';

import {PageWrapper} from '@organisms';

import PageMetadata from '@pages/PageMetadata';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource, setCurrentSource} from '@redux/reducers/sourcesSlice';

import {useGetSourceDetailsQuery} from '@services/sources';

import {safeRefetch} from '@utils/fetchUtils';

import {StyledPageHeader} from './SourceDetails.styled';
import SourceSettings from './SourceSettings';

const SourceDetails = () => {
  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);

  const currentSourceDetails = useAppSelector(selectCurrentSource);

  const name = useLocation().lastPathSegment;

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: sourceDetails, refetch} = useGetSourceDetailsQuery(name, {skip: !isClusterAvailable});

  const isPageDisabled = !name;

  useEffect(() => {
    if (sourceDetails) {
      dispatch(setCurrentSource(sourceDetails));
    }
  }, [sourceDetails]);

  useEffect(() => {
    safeRefetch(refetch);
  }, [location]);

  return (
    <PageWrapper>
      <PageMetadata title={`${name} | Sources`} />

      <StyledPageHeader onBack={() => navigate('/sources')} title={name} className="testkube-pageheader" />
      <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} destroyInactiveTabPane>
        <Tabs.TabPane tab="Settings" key="Settings" disabled={isPageDisabled}>
          {currentSourceDetails ? <SourceSettings /> : null}
        </Tabs.TabPane>
      </Tabs>
    </PageWrapper>
  );
};

export default SourceDetails;
