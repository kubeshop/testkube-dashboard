import {Children, FC, PropsWithChildren, ReactNode, useEffect, useState} from 'react';
import {useDeepCompareEffect} from 'react-use';

import {Form, FormInstance} from 'antd';
import {FormLayout} from 'antd/lib/form/Form';
import {FormLabelAlign} from 'antd/lib/form/interface';

import {FullWidthSpace} from '@custom-antd';

import {useLastCallback} from '@hooks/useLastCallback';

import {ConfigurationCard} from '@molecules';

interface CardFormProps {
  name: string;
  title: ReactNode;
  description: ReactNode;
  footer?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  wasTouched?: boolean;
  isWarning?: boolean;
  form?: FormInstance;
  labelAlign?: FormLabelAlign;
  layout?: FormLayout;
  initialValues?: any;
  confirmLabel?: string;
  onFieldsChange?: (...args: any) => void;
  spacing?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const noop = () => {};

const CardForm: FC<PropsWithChildren<CardFormProps>> = ({
  name,
  title,
  description,
  footer,
  labelAlign,
  layout = 'vertical',
  form,
  initialValues,
  disabled,
  readOnly,
  wasTouched,
  isWarning,
  confirmLabel,
  spacing,
  children,
  onFieldsChange,
  onConfirm,
  onCancel,
}) => {
  const cancel = useLastCallback(onCancel ?? (() => form?.resetFields()));

  const [currentInitialValues, setCurrentInitialValues] = useState(initialValues);

  useDeepCompareEffect(() => {
    form?.setFieldsValue(initialValues);
    setCurrentInitialValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    cancel();
  }, [currentInitialValues]);

  return (
    <Form
      layout={layout}
      initialValues={currentInitialValues}
      form={form}
      labelAlign={labelAlign}
      name={name}
      disabled={disabled}
      onFieldsChange={onFieldsChange}
      onFinish={onConfirm}
    >
      <ConfigurationCard
        title={title}
        description={description}
        footerText={footer}
        confirmButtonText={confirmLabel}
        forceEnableButtons={wasTouched}
        enabled={!readOnly}
        isWarning={isWarning}
        onConfirm={noop}
        onCancel={form || onCancel ? cancel : undefined}
      >
        {Children.count(children) ? (
          <FullWidthSpace size={spacing} direction="vertical">
            {children}
          </FullWidthSpace>
        ) : null}
      </ConfigurationCard>
    </Form>
  );
};

export default CardForm;
