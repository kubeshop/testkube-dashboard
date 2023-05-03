import {useMemo} from 'react';

import {Artifact} from '@models/artifact';

import {Skeleton, Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {ArtifactsListContainer} from './ArtifactsList.styled';
import ArtifactsListItem from './ArtifactsListItem';

type ArtifactsListProps = {
  artifacts: Artifact[];
  testExecutionId: string;
  isLoading?: boolean;
  testName?: string;
  testSuiteName?: string;
};

const ArtifactsList: React.FC<ArtifactsListProps> = props => {
  const {artifacts, testExecutionId, testName, testSuiteName, isLoading} = props;

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
        <ArtifactsListItem
          artifact={artifact}
          key={listItemKey}
          executionId={testExecutionId}
          testName={testName}
          testSuiteName={testSuiteName}
        />
      );
    });
  }, [artifacts, testExecutionId, isLoading]);

  return <ArtifactsListContainer>{renderedArtifactsList}</ArtifactsListContainer>;
};

export default ArtifactsList;
