import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';
// import * as queryString from 'query-string';

import {TestsContext} from '@context/testsContext';
import {timeStampToDate, getDuration} from '@utils/formatDate';
import {RenderTestStatusSvgIcon, Typography} from '@atoms';
// import {getQueryStringFromUrl} from '@utils/validate';

const StyledTestDescriptionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: var(--space-md);
  left: var(--space-md);
`;

const StyledTestDescriptionIcon = styled.div`
  position: relative;
  top: -135px;
`;

const StyledTestDescription = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: var(--space-md);
`;

const TestDescription = () => {
  const [testDescription, setTestDescription] = useState<any>({});
  const [api, setApi] = useState<string>(localStorage.getItem('apiEndpoint') || '');
  const tests: any = useContext(TestsContext);

  const {data, error} = useQuery(['test', tests.selectedTest], () => {
    // const url = getQueryStringFromUrl(window.location.href);
    // console.log('URL', url);

    // const params = new URL(window.location.href).searchParams;
    // console.log('PARAMS', params.get('apiEndpoint'));

    // localStorage.getItem('apiEndpoint');
    // const parsed = queryString.parse(window.location.search);
    // console.log(parsed);

    // console.log('PARAMS', params);

    if (api) {
      return fetch(`${api}/${tests.selectedTest}`).then(res => res.json());
    }
  });

  React.useEffect(() => {
    const apiFromUser = localStorage.getItem('apiEndpoint');
    if (apiFromUser) {
      setApi(apiFromUser);
    }
  }, []);

  useEffect(() => {
    if (tests.selectedTest) {
      const test = tests.data.find((t: any) => tests.selectedTest === t['id']);
      setTestDescription(test);
    }
  }, [tests.selectedTest]);

  const renderTestStatus = (testStatus: string) => {
    return testStatus === 'pending'
      ? 'PENDING'
      : testStatus === 'error'
      ? 'ERROR'
      : testStatus === 'success'
      ? 'SUCCESS'
      : testStatus === 'queued'
      ? 'QUEUED'
      : '';
  };

  return (
    <>
      {/* {console.log('script name', data['script-name'])} */}
      {/* {console.log('Ended At', data.execution['end-time'])}
      {console.log('Duration', data.execution['script-name'])}
      {console.log('script type', data['script-type'])} */}
      {tests.selectedTest && (
        <StyledTestDescriptionContainer>
          <StyledTestDescriptionIcon>
            <RenderTestStatusSvgIcon testStatus={testDescription.status} width={50} height={50} />
          </StyledTestDescriptionIcon>
          <StyledTestDescription>
            <Typography variant="secondary"> TEST {renderTestStatus(testDescription.status)}</Typography>
            <div>
              <Typography variant="secondary" font="bold">
                Name
              </Typography>
              <Typography variant="secondary" style={{marginTop: '-15px'}}>
                {/* {testDescription['script-name']} */}
                {testDescription['script-name'] && testDescription['script-name']}
              </Typography>
            </div>
            <div>
              <Typography variant="secondary" font="bold">
                Ended At
              </Typography>
              <Typography variant="secondary" style={{marginTop: '-15px'}}>
                {testDescription['end-time'] ? timeStampToDate(testDescription['end-time']) : '-'}
              </Typography>
            </div>
            <div>
              <Typography variant="secondary" font="bold">
                Duration
              </Typography>
              <Typography variant="secondary" style={{marginTop: '-15px'}}>
                {testDescription['end-time']
                  ? getDuration(testDescription['start-time'], testDescription['end-time'])
                  : '-'}
              </Typography>
            </div>
            <div>
              <Typography variant="secondary" font="bold">
                Type
              </Typography>
              <Typography variant="secondary" style={{marginTop: '-15px'}}>
                {testDescription['script-type']}
              </Typography>
            </div>
          </StyledTestDescription>
        </StyledTestDescriptionContainer>
      )}
    </>
  );
};

export default TestDescription;
