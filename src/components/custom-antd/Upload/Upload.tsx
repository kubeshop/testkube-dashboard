import {Upload as AntdUpload, UploadProps as AntdUploadProps, Button} from 'antd';

const DefaultBrowseButton = <Button>Browse</Button>;

const Upload: React.FC<AntdUploadProps> = props => {
  const {children = DefaultBrowseButton, ...rest} = props;

  return <AntdUpload {...rest}>{children}</AntdUpload>;
};

export default Upload;
