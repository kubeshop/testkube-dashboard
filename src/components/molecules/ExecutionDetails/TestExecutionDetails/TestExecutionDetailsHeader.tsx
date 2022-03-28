import {useContext} from 'react';

// import Colors from '@styles/Colors';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

// import {StyledGeneralInfoLabel, StyledGeneralInfoValue} from '../ExecutionDetails.styled';

const TestExecutionDetailsHeader = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  return (
    <>
      {/* <StyledGeneralInfoLabel>Suite</StyledGeneralInfoLabel>
      <StyledGeneralInfoValue color={Colors.purple}>Some test suite name</StyledGeneralInfoValue> */}
    </>
  );
};

export default TestExecutionDetailsHeader;
