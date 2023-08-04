import {useCallback, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {DashboardContext, MainContext} from '@contexts';

import {useLastCallback} from '@hooks/useLastCallback';

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

  const {id: name, settingsTab = 'general'} = useParams() as {id: string; settingsTab?: string};

  const {data: sourceDetails, error, refetch} = useGetSourceDetailsQuery(name, {skip: !isClusterAvailable});
  const reload = useCallback(() => safeRefetch(refetch), [refetch]);

  useEffect(() => {
    dispatch(setCurrentSource(sourceDetails));
  }, [sourceDetails]);

  useEffect(() => {
    reload();
  }, [location]);

  const setSettingsTab = useLastCallback((nextTab: string) => {
    navigate(`/sources/${name}/settings/${nextTab}`);
  });

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
        destroyInactiveTabPane
        items={[
          {
            key: 'settings',
            label: 'Settings',
            children: <SourceSettings reload={reload} tab={settingsTab} onTabChange={setSettingsTab} />,
          },
        ]}
      />
    </PageWrapper>
  );
};

export default SourceDetails;
