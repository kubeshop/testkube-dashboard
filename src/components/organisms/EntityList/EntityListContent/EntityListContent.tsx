import React, {useContext, useEffect, useState} from 'react';

import {Space} from 'antd';

import {Entity, EntityListBlueprint} from '@models/entity';
import {ModalConfigProps} from '@models/modal';
import {TestWithExecution} from '@models/test';
import {TestSuiteWithExecution} from '@models/testSuite';

import {Skeleton, Title} from '@custom-antd';
import Modal from '@custom-antd/Modal';

import {EntityGrid} from '@molecules';

import {PollingIntervals} from '@utils/numbers';
import {compareFiltersObject} from '@utils/objects';

import {useGetTestSuitesQuery} from '@services/testSuites';
import {useGetTestsQuery} from '@services/tests';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {TestModalConfig, TestSuiteModalConfig} from '../EntityCreationModal';
import {EntityListContext} from '../EntityListContainer/EntityListContainer';
import EmptyDataWithFilters from './EmptyDataWithFilters';
import {EmptyListWrapper, EntityListHeader, StyledEntityListSkeletonWrapper} from './EntityListContent.styled';
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
    <StyledEntityListSkeletonWrapper>
      {new Array(6).fill(0).map(() => {
        return <Skeleton loading title={false} {...skeletonConfig} />;
      })}
    </StyledEntityListSkeletonWrapper>
  );
};

const EntityListContent: React.FC<EntityListBlueprint> = props => {
  const {
    pageTitle,
    pageDescription: PageDescription,
    emptyDataComponent: EmptyData,
    entity,
    filtersComponentsIds,
    setQueryFilters,
    setData,
    initialFiltersState,
    setSelectedRecord,
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const {dispatch, navigate} = useContext(MainContext);
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

  const resetFilters = () => {
    dispatch(setQueryFilters(initialFiltersState));
  };

  const onNavigateToDetails = (item: any) => {
    navigate(`${entity}/executions/${item.dataItem.name}`);
  };

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

  const isFiltersEmpty = compareFiltersObject(initialFiltersState, queryFilters);
  const isEmptyData = (dataSource.length === 0 || !dataSource) && isFiltersEmpty && !contentProps.isLoading;

  const emptyDataAction = () => {
    if (entity === 'tests') {
      navigate('/dashboard/tests/add-test');
    } else {
      setIsModalVisible(true);
    }
  };

  const creationModalConfig: ModalConfigProps = entity === 'tests' ? TestModalConfig() : TestSuiteModalConfig();

  return (
    <>
      <EntityListHeader>
        {dataLayers[entity]}
        <Space size={15} direction="vertical">
          <Title color={Colors.slate50}>{pageTitle}</Title>
          <PageDescription />
        </Space>
      </EntityListHeader>
      {filtersComponentsIds && filtersComponentsIds.length ? (
        <>
          <Filters
            setFilters={setQueryFilters}
            filters={queryFilters}
            filtersComponentsIds={filtersComponentsIds}
            entity={entity}
            isFiltersDisabled={isEmptyData}
          />
        </>
      ) : null}
      {contentProps.isLoading ? (
        <EntityListSkeleton />
      ) : !dataSource || !dataSource.length ? (
        <EmptyListWrapper>
          {isFiltersEmpty ? (
            <EmptyData action={emptyDataAction} />
          ) : (
            <EmptyDataWithFilters resetFilters={resetFilters} />
          )}
        </EmptyListWrapper>
      ) : (
        <EntityGrid data={dataSource} onNavigateToDetails={onNavigateToDetails} />
      )}
      <Modal {...creationModalConfig} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
    </>
  );
};

export default EntityListContent;
