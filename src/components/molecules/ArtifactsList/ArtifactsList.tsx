import {useMemo} from 'react';

import {FileOutlined} from '@ant-design/icons';

import {Artifact} from '@models/artifact';

import {Skeleton, Text} from '@custom-antd';

import {downloadFile} from '@services/artifacts';

import Colors from '@styles/Colors';

import {ArtifactsListContainer, ArtifactsListItem, StyledDownloadIcon, StyledSpace} from './ArtifactsList.styled';

type ArtifactsListProps = {
  artifacts: Artifact[];
  testExecutionId: string;
  isLoading?: boolean;
};

const ArtifactsList: React.FC<ArtifactsListProps> = props => {
  const {artifacts, testExecutionId, isLoading} = props;

  const downloadArtifact = downloadFile(testExecutionId);

  const renderedArtifactsList = useMemo(() => {
    if (isLoading) {
      return (
        <>
          <Skeleton additionalStyles={{lineHeight: 40, color: Colors.slate900, contrastColor: Colors.slate700}} />
          <Skeleton additionalStyles={{lineHeight: 40, color: Colors.slate900, contrastColor: Colors.slate700}} />
          <Skeleton additionalStyles={{lineHeight: 40, color: Colors.slate900, contrastColor: Colors.slate700}} />
        </>
      );
    }
    if (!artifacts || !artifacts.length) {
      return (
        <Text className="semibold middle" color={Colors.whitePure}>
          No artifacts
        </Text>
      );
    }

    return artifacts.map((artifact, index) => {
      const {name} = artifact;

      const listItemKey = `${name} - ${index}`;

      return (
        <ArtifactsListItem key={listItemKey} onClick={() => downloadArtifact(name)}>
          <StyledSpace size={15}>
            <FileOutlined />
            <Text className="regular" color={Colors.slate300}>{name}</Text>
            <StyledDownloadIcon />
          </StyledSpace>
        </ArtifactsListItem>
      );
    });
  }, [artifacts, testExecutionId]);

  return <ArtifactsListContainer>{renderedArtifactsList}</ArtifactsListContainer>;
};

export default ArtifactsList;
