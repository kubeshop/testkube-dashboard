import {useState} from 'react';

import {FileOutlined} from '@ant-design/icons';

import {Text} from '@custom-antd';

import {Artifact} from '@models/artifact';

import {downloadArtifact} from '@services/artifacts';

import Colors from '@styles/Colors';

import {DefaultRequestError, displayDefaultErrorNotification} from '@utils/notification';

import {ArtifactsListItemContainer, StyledDownloadIcon, StyledLoader, StyledSpace} from './ArtifactsListItem.styled';

interface ArtifactsListItemProps {
  artifact: Artifact;
  executionId: string;
  testName?: string;
  testSuiteName?: string;
}

const ArtifactsListItem: React.FC<ArtifactsListItemProps> = ({artifact, executionId, testName, testSuiteName}) => {
  const {name} = artifact;

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadArtifact(name, executionId, testName, testSuiteName);
    } catch (err) {
      displayDefaultErrorNotification(err as DefaultRequestError);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <ArtifactsListItemContainer
      className={isDownloading ? 'disabled' : ''}
      onClick={() => handleDownload()}
      data-testid="artifact-list-item"
    >
      <StyledSpace size={15}>
        <FileOutlined data-testid="artifact-type-icon" />
        <Text className="regular" color={Colors.slate300}>
          {name}
        </Text>
        {isDownloading ? <StyledLoader /> : <StyledDownloadIcon data-testid="artifact-download-icon" />}
      </StyledSpace>
    </ArtifactsListItemContainer>
  );
};

export default ArtifactsListItem;
