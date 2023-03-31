import {forwardRef} from 'react';
import {Upload as AntdUpload, UploadProps as AntdUploadProps, Button} from 'antd';

const DefaultBrowseButton = <Button>Browse</Button>;

const Upload = forwardRef<any, AntdUploadProps>((props, ref) => {
  const {children = DefaultBrowseButton, ...rest} = props;

  return <AntdUpload ref={ref} {...rest}>{children}</AntdUpload>;
});

export default Upload;
