import {forwardRef} from 'react';

import {Upload as AntdUpload, Button, UploadProps} from 'antd';

const defaultBrowseButton = <Button>Browse</Button>;

const Upload = forwardRef<any, UploadProps>((props, ref) => {
  const {children = defaultBrowseButton, ...rest} = props;
  return (
    <AntdUpload ref={ref} {...rest}>
      {children}
    </AntdUpload>
  );
});

export default Upload;
