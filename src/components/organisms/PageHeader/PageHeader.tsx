import React from 'react';
import styled from 'styled-components';

import {DocLinks, PageTitle} from '@molecules';
import {Button, LabelInput, KbModal} from '@atoms';

import {
  matchEndpointProtocolWithHostProtocol,
  validateUrl,
  removeDuplicatesInQueryString,
  checkApiEndpointProtocol,
} from '@utils/validate';

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
  align-items: center;
`;

const StyledHeaderTests = styled.div`
  display: flex;
  flex-flow: row;
`;

const PageHeader = () => {
  const [apiEndpoint, setApiEndpoint] = React.useState<IUrlEndpoint>({apiEndpoint: ''});
  const [validUrl, setVAlidUrl] = React.useState<boolean>(false);

  const handleOpenUrl = (event: React.SyntheticEvent) => {
    event.preventDefault();

    removeDuplicatesInQueryString(window.location.href);
    matchEndpointProtocolWithHostProtocol(apiEndpoint.apiEndpoint);

    const checked = checkApiEndpointProtocol(apiEndpoint.apiEndpoint);

    window.open(`${window.location.origin}/?apiEndpoint=${checked}`);
  };

  const handleChangeApiEndpoint = (event: React.ChangeEvent<HTMLInputElement>, field: keyof IUrlEndpoint) => {
    setApiEndpoint({...apiEndpoint, [field]: event.target.value});
    const validatedUrl = validateUrl(apiEndpoint.apiEndpoint);
    setVAlidUrl(validatedUrl);
  };

  return (
    <StyledPAgeHeader>
      <PageTitle />
      <StyledHeaderTests>
        <KbModal>
          <StyledSearchUrlForm onSubmit={handleOpenUrl}>
            <LabelInput
              id="url"
              name="url"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeApiEndpoint(event, 'apiEndpoint')}
              defaultValue={apiEndpoint.apiEndpoint}
            />
            <Button type="submit" disabled={!validUrl} onClick={handleOpenUrl} disableFilter>
              Get tests
            </Button>
          </StyledSearchUrlForm>
        </KbModal>
        <DocLinks />
      </StyledHeaderTests>
    </StyledPAgeHeader>
  );
};

export default PageHeader;
