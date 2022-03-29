import {getLastStringAfterTrailingSlash} from '@utils';

import {ReactComponent as DownloadIcon} from '@assets/downloadFileIcon.svg';
import {ReactComponent as FileIcon} from '@assets/fileIcon.svg';

import {downloadFileName} from '@services/artifacts';

import {StyledArtifacts, StyledArtifactsContainer, StyledFileArtifactsFileName} from './Artifacts.styled';

interface IArtifactsProps {
  artifacts: any;
  testId?: string;
}

const Artifacts = ({artifacts, testId}: IArtifactsProps) => {
  const downloadFile = (fileName: string, executionId: string) => {
    downloadFileName(fileName, executionId);
  };

  return (
    <>
      {artifacts.map(({name, size}: any) => (
        <StyledArtifactsContainer>
          <StyledArtifacts>
            <StyledFileArtifactsFileName>
              <FileIcon style={{marginRight: '10px', marginLeft: '20px'}} />
              <span>{getLastStringAfterTrailingSlash(name)}</span>
            </StyledFileArtifactsFileName>
            <DownloadIcon
              style={{marginRight: '12px', cursor: 'pointer'}}
              onClick={() => name && testId && downloadFile(name, testId)}
            />
          </StyledArtifacts>
        </StyledArtifactsContainer>
      ))}
    </>
  );
};

export default Artifacts;
