import {FC, useCallback, useRef} from 'react';

import {UploadChangeParam, UploadProps} from 'antd/lib/upload';

import classNames from 'classnames';

import {Input, Upload} from '@custom-antd';

import {StyledUploadWithInputContainer} from './UploadWithInput.styled';

type UploadWithInputProps = {
  onFileChange: (info: UploadChangeParam | null) => void;
  // received from <Form /> parent. Don't specify directly
  value?: {
    fileContent: string;
    fileName: string;
  };
  fieldInstance?: boolean;
} & Pick<UploadProps, 'beforeUpload'>;

const defaultBeforeUpload = () => false;

const UploadWithInput: FC<UploadWithInputProps> = props => {
  const {onFileChange, beforeUpload = defaultBeforeUpload, value} = props;
  const uploadRef = useRef<any>();
  const onInputClick = useCallback(() => uploadRef.current?.upload.uploader.fileInput.click(), []);
  const clear = useCallback(() => onFileChange(null), [onFileChange]);

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
        onChange={clear}
        placeholder="Choose a file"
      />
      <Upload ref={uploadRef} maxCount={1} onChange={onFileChange} showUploadList={false} beforeUpload={beforeUpload} />
    </StyledUploadWithInputContainer>
  );
};

export default UploadWithInput;
