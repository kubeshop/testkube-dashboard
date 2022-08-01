import {useMemo} from 'react';

import {FileOutlined} from '@ant-design/icons';

import {Artifact} from '@models/artifact';

import {Text} from '@custom-antd';

import {downloadFileName} from '@services/artifacts';

import Colors from '@styles/Colors';

import {ArtifactsListContainer, ArtifactsListItem, StyledDownloadIcon, StyledSpace} from './ArtifactsList.styled';

type ArtifactsListProps = {
  artifacts: Artifact[];
  testExecutionId: string;
};

const ArtifactsList: React.FC<ArtifactsListProps> = props => {
  const {artifacts, testExecutionId} = props;

  const renderedArtifactsList = useMemo(() => {
    return artifacts.map((artifact, index) => {
      const {name} = artifact;

      const listItemKey = `${name} - ${index}`;

      return (
        <ArtifactsListItem key={listItemKey} onClick={() => downloadFileName(name, testExecutionId)}>
          <StyledSpace size={15}>
            <FileOutlined />
            <Text color={Colors.slate300}>{name}</Text>
            <StyledDownloadIcon />
          </StyledSpace>
        </ArtifactsListItem>
      );
    });
  }, [artifacts, testExecutionId]);

  return <ArtifactsListContainer>{renderedArtifactsList}</ArtifactsListContainer>;
};

export default ArtifactsList;
