import {Upload as AntdUpload, UploadProps as AntdUploadProps, Button} from 'antd';

import {UploadOutlined} from '@ant-design/icons';

const DefaultBrowseButton = <Button icon={<UploadOutlined />}>Browse</Button>;

const Upload: React.FC<AntdUploadProps> = props => {
  const {children = DefaultBrowseButton, ...rest} = props;

  return <AntdUpload {...rest}>{children}</AntdUpload>;
};

export default Upload;
