import {useCallback, useContext, useEffect, useState} from 'react';

import {Tabs} from 'antd';

import {DashboardContext, MainContext} from '@contexts';

import useLocation from '@hooks/useLocation';

import {PageHeader, PageWrapper} from '@organisms';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource, setCurrentSource} from '@redux/reducers/sourcesSlice';

import {useGetSourceDetailsQuery} from '@services/sources';

import {safeRefetch} from '@utils/fetchUtils';

import SourceSettings from './SourceSettings';

const SourceDetails = () => {
  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);

  const currentSourceDetails = useAppSelector(selectCurrentSource);

  const name = useLocation().lastPathSegment;

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: sourceDetails, error, refetch} = useGetSourceDetailsQuery(name, {skip: !isClusterAvailable});
  const reload = useCallback(() => safeRefetch(refetch), [refetch]);

  const isPageDisabled = !name;

  useEffect(() => {
    dispatch(setCurrentSource(sourceDetails));
  }, [sourceDetails]);

  useEffect(() => {
    reload();
  }, [location]);

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }
  if (!sourceDetails || !currentSourceDetails) {
    return <Loading />;
  }

  return (
    <PageWrapper>
      <PageMetadata title={`${name} | Sources`} />

      <PageHeader onBack={() => navigate('/sources')} title={name} />
      <Tabs
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        destroyInactiveTabPane
        items={[
          {
            key: 'Settings',
            label: 'Settings',
            children: <SourceSettings reload={reload} />,
          },
        ]}
      />
    </PageWrapper>
  );
};

export default SourceDetails;
