import React from 'react';
import styled from 'styled-components';

import {DocLinks, PageTitle} from '@molecules';
import {Button, LabelInput} from '@atoms';

// import {validateUrl} from '@utils/validate';

interface IUrlEndpoint {
  apiEndpoint: string;
}

const StyledPAgeHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-light-primary);
`;

const StyledSearchUrlForm = styled.form`
  display: flex;
  align-items: flex-end;
`;

const StyledHeaderTests = styled.div`
  display: flex;
`;

const PageHeader = () => {
  const [apiEndpoint, setApiEndpoint] = React.useState<IUrlEndpoint>({apiEndpoint: ''});

  const handleOpenUrl = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const urlParams = window.location;
    // eslint-disable-next-line
    window.open(urlParams + `?apiEndpoint=${apiEndpoint.apiEndpoint}`);
    localStorage.setItem('apiEndpoint', apiEndpoint.apiEndpoint);
  };

  const handleChangeApiEndpoint = (event: React.ChangeEvent<HTMLInputElement>, field: keyof IUrlEndpoint) => {
    setApiEndpoint({...apiEndpoint, [field]: event.target.value});
  };

  return (
    <StyledPAgeHeader>
      <PageTitle />
      <StyledHeaderTests>
        <StyledSearchUrlForm onSubmit={handleOpenUrl}>
          <LabelInput
            id="url"
            name="url"
            labelText="Test Endpoint "
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeApiEndpoint(event, 'apiEndpoint')}
            defaultValue={apiEndpoint.apiEndpoint}
          />
          <Button onClick={handleOpenUrl}>Get tests</Button>
        </StyledSearchUrlForm>
        <DocLinks />
      </StyledHeaderTests>
    </StyledPAgeHeader>
  );
};

export default PageHeader;
