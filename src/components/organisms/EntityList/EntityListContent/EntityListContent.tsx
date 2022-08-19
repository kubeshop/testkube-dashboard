import React, {useContext, useEffect, useState} from 'react';

import {Space} from 'antd';

import {Entity, EntityListBlueprint} from '@models/entity';
import {ModalConfigProps} from '@models/modal';
import {OnDataChangeInterface} from '@models/onDataChange';

import {Button, Modal, Title} from '@custom-antd';

import {EntityGrid} from '@molecules';

import {compareFiltersObject} from '@utils/objects';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {TestModalConfig, TestSuiteModalConfig} from '../EntityCreationModal';
import {EntityListContext} from '../EntityListContainer/EntityListContainer';
import Filters from '../EntityListFilters';
import EmptyDataWithFilters from './EmptyDataWithFilters';
import {TestSuitesDataLayer, TestsDataLayer} from './EntityDataLayers';
import {EmptyListWrapper, EntityListHeader, StyledContainer, StyledFiltersSection} from './EntityListContent.styled';
import EntityListSkeleton from './EntityListSkeleton';

const modalTypes: {[key in Entity]: ModalConfigProps} = {
  'test-suites': TestSuiteModalConfig,
  tests: TestModalConfig,
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
    addEntityButtonText,
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
  const isEmptyData = (dataSource?.length === 0 || !dataSource) && isFiltersEmpty && !contentProps.isLoading;

  const addEntityAction = () => {
    setIsModalVisible(true);
  };

  const creationModalConfig: ModalConfigProps = modalTypes[entity];

  return (
    <div style={{padding: 40, overflow: 'auto'}}>
      <EntityListHeader>
        {dataLayers[entity]}
        <Space size={15} direction="vertical">
          <Title color={Colors.slate50} ellipsis>
            {pageTitle}
          </Title>
          <PageDescription />
        </Space>
      </EntityListHeader>
      {filtersComponentsIds && filtersComponentsIds.length ? (
        <StyledFiltersSection>
          <Filters
            setFilters={setQueryFilters}
            filters={queryFilters}
            filtersComponentsIds={filtersComponentsIds}
            entity={entity}
            isFiltersDisabled={isEmptyData}
          />
          <Button $customType="primary" onClick={addEntityAction}>
            {addEntityButtonText}
          </Button>
        </StyledFiltersSection>
      ) : null}
      {contentProps.isLoading ? (
        <EntityListSkeleton />
      ) : !dataSource || !dataSource.length ? (
        <EmptyListWrapper>
          {isFiltersEmpty ? (
            <EmptyData action={addEntityAction} />
          ) : (
            <EmptyDataWithFilters resetFilters={resetFilters} />
          )}
        </EmptyListWrapper>
      ) : (
        <EntityGrid data={dataSource} onNavigateToDetails={onNavigateToDetails} />
      )}
      {isModalVisible ? (
        <Modal {...creationModalConfig} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
      ) : null}
    </div>
  );
};

export default EntityListContent;
