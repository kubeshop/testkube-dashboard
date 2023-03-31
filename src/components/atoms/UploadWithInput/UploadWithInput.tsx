import {useCallback, useRef} from 'react';
import {UploadChangeParam, UploadProps} from 'antd/lib/upload';

import classNames from 'classnames';

import {Input, Upload} from '@custom-antd';

import {StyledUploadWithInputContainer} from './UploadWithInput.styled';

type UploadWithInputProps = {
  onFileChange: (info: UploadChangeParam | null) => void;
  // received from <Form /> parent. Don't specify directly
  onChange?: any;
  // received from <Form /> parent. Don't specify directly
  value?: {
    fileContent: string;
    fileName: string;
  };
  fieldInstance?: boolean;
};

const defaultBeforeUpload = () => false;

const UploadWithInput: React.FC<UploadWithInputProps & Pick<UploadProps, 'beforeUpload'>> = props => {
  const {onFileChange, beforeUpload = defaultBeforeUpload, value} = props;
  const uploadRef = useRef<any>();
  const onInputClick = useCallback(() => uploadRef.current?.upload.uploader.fileInput.click(), []);
  const onInputClear = useCallback(() => onFileChange(null), [onFileChange]);

  const inputClassNames = classNames({
    'not-empty': value?.fileName,
    'disabled-input': true,
  });

  return (
    <StyledUploadWithInputContainer>
      <Input
        readOnly
        className={inputClassNames}
        value={value?.fileName || ''}
        allowClear
        onPointerUpCapture={onInputClick}
        onChange={onInputClear}
        placeholder="Choose a file"
      />
      <Upload
        ref={uploadRef}
        maxCount={1}
        onChange={onFileChange}
        showUploadList={false}
        beforeUpload={beforeUpload}
      />
    </StyledUploadWithInputContainer>
  );
};

export default UploadWithInput;
