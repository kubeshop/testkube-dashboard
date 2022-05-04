import {useMemo} from 'react';

import {FileOutlined} from '@ant-design/icons';

import {Artifact} from '@models/artifact';

import {downloadFileName} from '@services/artifacts';

import {
  StyledArtifactsFileName,
  StyledArtifactsListContainer,
  StyledArtifactsListItem,
  StyledDownloadIcon,
  StyledSpace,
} from './ArtifactsList.styled';

type ArtifactsListProps = {
  artifacts: Array<Artifact>;
  testExecutionId: string;
};

const ArtifactsList: React.FC<ArtifactsListProps> = props => {
  const {artifacts, testExecutionId} = props;

  const renderedArtifactsList = useMemo(() => {
    return artifacts.map((artifact, index) => {
      const {name} = artifact;

      const listItemKey = `${name} - ${index}`;

      return (
        <StyledArtifactsListItem key={listItemKey} onClick={() => downloadFileName(name, testExecutionId)}>
          <StyledSpace size={15}>
            <FileOutlined />
            <StyledArtifactsFileName>{name}</StyledArtifactsFileName>
            <StyledDownloadIcon />
          </StyledSpace>
        </StyledArtifactsListItem>
      );
    });
  }, [artifacts, testExecutionId]);

  return <StyledArtifactsListContainer>{renderedArtifactsList}</StyledArtifactsListContainer>;
};

export default ArtifactsList;
