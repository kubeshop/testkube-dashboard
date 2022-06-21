import {ReactElement} from 'react';

import {Input, Radio, Select} from 'antd';

import {UploadWithInput} from '@atoms';

import {FormItem} from '@custom-antd';

import VariablesFormList from '@src/components/molecules/VariablesFormList';

const {Option} = Select;
const {TextArea} = Input;

type DefaultConfig = {
  onFileChange?: () => {};
  form?: null;
};

const renderFormItems = (array: any, config: DefaultConfig = {}) => {
  const {onFileChange, form} = config;

  return array.map((formItem: any) => {
    const {
      options = null,
      itemLabel,
      tooltip,
      fieldName,
      inputType,
      modificator = null,
      rules = [],
      help = null,
    } = formItem;

    let children: Nullable<ReactElement<any, any>> = null;

    if (inputType === 'select') {
      children = (
        <Select>
          {options.map((option: any) => {
            return (
              <Option value={option.value} key={option.value}>
                {option.label}
              </Option>
            );
          })}
        </Select>
      );
    }

    if (inputType === 'radio') {
      children = (
        <Radio.Group>
          {options.map((option: any) => {
            return (
              <Radio value={option.value} key={option.value}>
                {option.label}
              </Radio>
            );
          })}
        </Radio.Group>
      );
    }

    if (inputType === 'default') {
      if (modificator) {
        if (modificator === 'password') {
          children = <Input.Password />;
        }
      } else {
        children = <Input />;
      }
    }

    if (inputType === 'uploadWithInput' && onFileChange) {
      children = <UploadWithInput onFileChange={onFileChange} />;
    }

    if (inputType === 'textarea') {
      children = <TextArea rows={10} />;
    }

    if (inputType === 'variables' && form) {
      return <VariablesFormList form={form} data={[]} isSaveable={false} />;
    }

    if (!children) {
      return null;
    }

    return (
      <FormItem rules={rules} label={itemLabel} name={fieldName} tooltip={tooltip} key={fieldName} help={help}>
        {children}
      </FormItem>
    );
  });
};

export default renderFormItems;
