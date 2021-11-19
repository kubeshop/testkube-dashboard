import React from 'react';

import {ReactComponent as DownloadIcon} from '@assets/downloadFileIcon.svg';
import {ReactComponent as FileIcon} from '@assets/fileIcon.svg';
import {selectedTestId} from '@src/redux/reducers/testsListSlice';
import {useAppSelector} from '@src/redux/hooks';
import {useGetArtifactsQuery} from '@src/services/tests';
import {
  StyledArtifacts,
  StyledArtifactsContainer,
  StyledFileArtifactsFileName,
  StyledNoArtifactsFound,
} from './Artifacts.styled';

const Artifacts = () => {
  const testId = useAppSelector(selectedTestId);
  const {data, error, isLoading} = useGetArtifactsQuery(testId, {
    skip: !testId,
  });

  return (
    <>
      {testId && data ? (
        data.map(({name, size}: any) => (
          <StyledArtifactsContainer>
            <StyledArtifacts>
              <StyledFileArtifactsFileName>
                <FileIcon style={{marginRight: '10px', marginLeft: '20px'}} />
                <span>{name}</span>
              </StyledFileArtifactsFileName>
              <a href="https://assets.website-files.com/611f279603d61242ae80e191/61663e5db099f6a0cd003323_testkube-logo.svg">
                <DownloadIcon style={{marginRight: '12px', cursor: 'pointer'}} />
              </a>
            </StyledArtifacts>
          </StyledArtifactsContainer>
        ))
      ) : (
        <StyledArtifacts>
          <StyledNoArtifactsFound>No Artifacts found!</StyledNoArtifactsFound>
        </StyledArtifacts>
      )}
    </>
  );
};

export default Artifacts;
