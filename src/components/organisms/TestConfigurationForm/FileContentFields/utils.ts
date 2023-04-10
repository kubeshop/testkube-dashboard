import {FormInstance} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

export const onFileChange = (file: Nullable<UploadChangeParam>, form: FormInstance) => {
  if (!file) {
    form.setFieldsValue({
      file: null,
    });

    form.validateFields(['file']);
    return;
  }

  const readFile = new FileReader();

  readFile.onload = e => {
    if (e && e.target) {
      const fileContent = e.target.result;

      if (fileContent) {
        form.setFieldsValue({
          file: {
            fileContent: fileContent as string,
            fileName: file.file.name,
          },
        });

        form.validateFields(['file']);
      }
    }
  };

  // @ts-ignore
  readFile.readAsText(file.file);
};
