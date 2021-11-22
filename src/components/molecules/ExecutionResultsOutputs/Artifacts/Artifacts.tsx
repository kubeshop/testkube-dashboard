import React from 'react';

import { ReactComponent as DownloadIcon } from '@assets/downloadFileIcon.svg';
import { ReactComponent as FileIcon } from '@assets/fileIcon.svg';
import { selectedTestId } from '@src/redux/reducers/testsListSlice';
import { useAppSelector } from '@src/redux/hooks';
import { useGetArtifactsQuery } from '@src/services/tests';
import { downloadFileName } from '@src/services/artifacts';
import {
  StyledArtifacts,
  StyledArtifactsContainer,
  StyledFileArtifactsFileName,
  StyledNoArtifactsFound,
} from './Artifacts.styled';

const Artifacts = () => {
  const testId = useAppSelector(selectedTestId);
  const { data, error, isLoading } = useGetArtifactsQuery(testId, {
    skip: !testId,
  });

  const downloadFile = (fileName: string, executionId: string) => {
    downloadFileName(fileName, executionId);
  };

  return (
    <>
      {data ? (
        data.map(({ name, size }: any) => (
          <StyledArtifactsContainer>
            <StyledArtifacts>
              <StyledFileArtifactsFileName>
                <FileIcon style={{ marginRight: '10px', marginLeft: '20px' }} />
                <span>{name}</span>
              </StyledFileArtifactsFileName>
              <DownloadIcon
                style={{ marginRight: '12px', cursor: 'pointer' }}
                onClick={() => name && testId && downloadFile(name, testId)}
              />
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
