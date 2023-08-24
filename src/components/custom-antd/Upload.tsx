import {FC} from 'react';

import {Upload as AntdUpload, UploadProps as AntdUploadProps, Button} from 'antd';

const DefaultBrowseButton = <Button>Browse</Button>;

export const Upload: FC<AntdUploadProps> = props => {
  const {children = DefaultBrowseButton, ...rest} = props;

  return <AntdUpload {...rest}>{children}</AntdUpload>;
};
