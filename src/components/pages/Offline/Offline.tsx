import {CloudSyncOutlined} from '@ant-design/icons';

import {OfflineContainer, OfflineIcon} from './Offline.styled';

const Offline = () => {
  return (
    <OfflineContainer>
      <OfflineIcon>
        <CloudSyncOutlined />
      </OfflineIcon>
      <div>Your cluster is offline.</div>
    </OfflineContainer>
  );
};

export default Offline;
