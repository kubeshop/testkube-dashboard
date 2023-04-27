import {useState} from 'react';

import {LoadingOutlined} from '@ant-design/icons';

import {LoadingContainer} from './Loading.styled';

const Loading = () => {
  const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);

  return (
    <LoadingContainer>
      <LoadingOutlined />
    </LoadingContainer>
  );
};

export default Loading;
