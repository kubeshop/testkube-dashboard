import {useState} from 'react';

import {FileOutlined} from '@ant-design/icons';

import {Artifact} from '@models/artifact';

import {Text} from '@custom-antd';

import {displayDefaultErrorNotification} from '@utils/notification';

import {downloadArtifact} from '@services/artifacts';

import Colors from '@styles/Colors';

import {ArtifactsListItemContainer, StyledDownloadIcon, StyledLoader, StyledSpace} from './ArtifactsListItem.styled';

interface ArtifactsListItemProps {
  artifact: Artifact;
  executionId: string;
  testName?: string;
  testSuiteName?: string;
}

const ArtifactsListItem: React.FC<ArtifactsListItemProps> = ({
  artifact,
  executionId,
  testName,
  testSuiteName,
}) => {
  const {name} = artifact;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadArtifact(name, executionId, testName, testSuiteName);
    } catch (err: any) {
      displayDefaultErrorNotification(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <ArtifactsListItemContainer className={isDownloading ? 'disabled' : ''} onClick={() => handleDownload()}>
      <StyledSpace size={15}>
        <FileOutlined />
        <Text className="regular" color={Colors.slate300}>{name}</Text>
        {isDownloading ? <StyledLoader /> : <StyledDownloadIcon />}
      </StyledSpace>
    </ArtifactsListItemContainer>
  );
};

export default ArtifactsListItem;
