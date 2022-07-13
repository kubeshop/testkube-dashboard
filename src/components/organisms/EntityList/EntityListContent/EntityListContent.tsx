import React, {useContext, useEffect, useState} from 'react';

import {Space} from 'antd';

import {Entity, EntityListBlueprint} from '@models/entity';
import {TestWithExecution} from '@models/test';
import {TestSuiteWithExecution} from '@models/testSuite';

import {Skeleton, Text, Title} from '@custom-antd';

import {EntityGrid} from '@molecules';

import {PollingIntervals} from '@utils/numbers';

import {useGetTestSuitesQuery} from '@services/testSuites';
import {useGetTestsQuery} from '@services/tests';

import Colors from '@styles/Colors';

import {MainContext} from '@src/contexts';

import {EntityListContext} from '../EntityListContainer/EntityListContainer';
import {EntityListHeader} from './EntityListContent.styled';
import Filters from './Filters';

type OnDataChangeInterface = {
  data: TestSuiteWithExecution[] | TestWithExecution[];
  isLoading: boolean;
  isFetching: boolean;
  refetch: Function;
};

type DataLayerProps = {
  onDataChange: (args: OnDataChangeInterface) => void;
  queryFilters?: any;
};

const TestSuitesDataLayer: React.FC<DataLayerProps> = props => {
  const {onDataChange, queryFilters} = props;

  const {data, isLoading, isFetching, refetch, ...rest} = useGetTestSuitesQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
  });

  useEffect(() => {
    if (rest.error) {
      onDataChange({data: [], isLoading: false, isFetching: false, refetch});
    } else {
      onDataChange({data: data || [], isLoading, isFetching, refetch});
    }
  }, [data, isLoading, isFetching]);

  return <></>;
};

const TestsDataLayer: React.FC<DataLayerProps> = props => {
  const {onDataChange, queryFilters} = props;

  const {data, isLoading, isFetching, refetch, ...rest} = useGetTestsQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
  });

  useEffect(() => {
    if (rest.error) {
      onDataChange({data: [], isLoading: false, isFetching: false, refetch});
    } else {
      onDataChange({data: data || [], isLoading, isFetching, refetch});
    }
  }, [data, isLoading, isFetching, rest.error]);

  return <></>;
};

const EntityListSkeleton: React.FC = () => {
  const skeletonConfig = {
    paragraph: {
      rows: 1,
      width: '100%',
    },
    additionalStyles: {
      lineHeight: 120,
    },
  };

  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 32px'}}>
      {new Array(6).fill(0).map(() => {
        return <Skeleton loading title={false} {...skeletonConfig} />;
      })}
    </div>
  );
};

const EntityListContent: React.FC<EntityListBlueprint> = props => {
  const {
    pageTitle,
    pageDescription,
    emptyDataComponent: EmptyData,
    entity,
    filtersComponentsIds,
    setQueryFilters,
    setData,
  } = props;

  const {dispatch} = useContext(MainContext);
  const {queryFilters, dataSource} = useContext(EntityListContext);

  const [contentProps, setContentProps] = useState<OnDataChangeInterface>({
    data: [],
    isLoading: false,
    isFetching: false,
    refetch: () => {},
  });

  const onDataChange = (args: OnDataChangeInterface) => {
    setContentProps(args);
  };

  const dataLayers: {[key in Entity]: any} = {
    tests: <TestsDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
    'test-suites': <TestSuitesDataLayer onDataChange={onDataChange} queryFilters={queryFilters} />,
  };

  const isEmptyTestsData = false;

  useEffect(() => {
    if (!setData || contentProps.isLoading || contentProps.isFetching) {
      return;
    }

    if (contentProps.data && contentProps.data.length) {
      dispatch(setData(contentProps.data));

      return;
    }

    if (!contentProps.data || !contentProps.data.length) {
      // if no results - set result as an empty array because not all the time we get an empty array from backend
      dispatch(setData([]));
    }
  }, [contentProps.data, contentProps.isLoading, contentProps.isFetching]);

  return (
    <>
      <EntityListHeader>
        {dataLayers[entity]}
        <Space size={15} direction="vertical">
          <Title color={Colors.slate50}>{pageTitle}</Title>
          <Text className="regular small" color={Colors.slate400}>
            {pageDescription}
          </Text>
        </Space>
      </EntityListHeader>
      <div style={{marginTop: 60, height: '100%', display: 'flex', flexDirection: 'column'}}>
        <div>
          {filtersComponentsIds && filtersComponentsIds.length ? (
            <div>
              <Filters
                setFilters={setQueryFilters}
                filters={queryFilters}
                filtersComponentsIds={filtersComponentsIds}
                entity={entity}
                isFiltersDisabled={isEmptyTestsData}
              />
            </div>
          ) : null}
        </div>
        <div style={{height: '100%', overflow: 'auto'}}>
          {contentProps.isLoading ? (
            <EntityListSkeleton />
          ) : !contentProps.data || !contentProps.data.length ? (
            <div style={{display: 'flex', height: '100%', alignItems: 'center'}}>
              <EmptyData />
            </div>
          ) : (
            <div style={{marginTop: 25}}>
              <EntityGrid data={dataSource} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EntityListContent;
