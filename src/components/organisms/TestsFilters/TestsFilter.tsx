import React from 'react';
import styled from 'styled-components';

import {Typography, Button, LabelInput} from '@atoms';

import {TestsContext} from '@context/testsContext';
// import {validateUrl} from '@utils/validate';

interface IUrlEndpoint {
  apiEndpoint: string;
}

const StyleTestsFilterContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const StyleTestFilterButtons = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

const StyledSearchUrlForm = styled.form`
  display: flex;
  align-items: flex-end;
`;

const TestsFilter = () => {
  const tests: any = React.useContext(TestsContext);
  const [apiEndpoint, setApiEndpoint] = React.useState<IUrlEndpoint>({apiEndpoint: ''});

  const handleOpenUrl = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const urlParams = window.location;

    // if (validateUrl(apiEndpoint.apiEndpoint)) {
    // eslint-disable-next-line
    window.open(urlParams + `?apiEndpoint=${apiEndpoint.apiEndpoint}`);
    // eslint-disable-next-line
    console.log('Here', urlParams + `?apiEndpoint=${apiEndpoint.apiEndpoint}`);
    // } else {
    //   alert('Invalid URL');
    // }
  };

  const handleChangeApiEndpoint = (event: React.ChangeEvent<HTMLInputElement>, field: keyof IUrlEndpoint) => {
    setApiEndpoint({...apiEndpoint, [field]: event.target.value});
  };

  return (
    <StyleTestsFilterContainer>
      <Typography variant="secondary" data-testid="Test filters">
        Tests
      </Typography>
      <StyledSearchUrlForm onSubmit={handleOpenUrl}>
        <LabelInput
          id="url"
          name="url"
          labelText="Url: "
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeApiEndpoint(event, 'apiEndpoint')}
          defaultValue={apiEndpoint.apiEndpoint}
        />
        <Button onClick={handleOpenUrl}>Get tests</Button>
      </StyledSearchUrlForm>
      <StyleTestFilterButtons>
        <Typography variant="secondary">Show: </Typography>
        <Button onClick={() => tests.setSelectedTestTypes('all')}>All</Button>
        <Button onClick={() => tests.setSelectedTestTypes('pending')}>Running</Button>
        <Button onClick={() => tests.setSelectedTestTypes('success')}>Passed</Button>
        <Button onClick={() => tests.setSelectedTestTypes('failed')}>Failed</Button>
      </StyleTestFilterButtons>
    </StyleTestsFilterContainer>
  );
};

export default TestsFilter;
