import {useContext, useState} from 'react';

import {Title} from '@atoms';

import {ExecutionDetails} from '@molecules';
import {StyledInfoPanelHeaderContainer} from '@molecules/InfoPanelHeader/InfoPanelHeader.styled';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {DashboardContext} from '../../DashboardContainer/DashboardContainer';

const DashboardInfoPanelSecondLevelContent = () => {
  const {selectedExecution} = useContext(DashboardContext);

  const {index} = selectedExecution;

  const [executionDetailsProps, setExecutionDetailsProps] = useState<any>({
    data: null,
    isLoading: false,
    isFetching: false,
    refetch: () => {},
  });

  const onDataChange = (data: any) => {
    setExecutionDetailsProps(data);
  };

  return (
    <DashboardInfoPanelSecondLevelContext.Provider value={{onDataChange, ...executionDetailsProps}}>
      <StyledInfoPanelHeaderContainer>
        <Title level={4}>Execution #{index}</Title>
      </StyledInfoPanelHeaderContainer>
      <ExecutionDetails />
    </DashboardInfoPanelSecondLevelContext.Provider>
  );
};

export default DashboardInfoPanelSecondLevelContent;
