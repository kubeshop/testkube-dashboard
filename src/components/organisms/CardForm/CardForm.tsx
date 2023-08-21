import {Children, FC, PropsWithChildren, ReactNode} from 'react';

import {Form, FormInstance} from 'antd';
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
  initialValues?: any;
  confirmLabel?: string;
  onFieldsChange?: (...args: any) => void;
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
  form,
  initialValues,
  disabled,
  readOnly,
  wasTouched,
  isWarning,
  confirmLabel,
  children,
  onFieldsChange,
  onConfirm,
  onCancel,
}) => {
  const cancel = useLastCallback(onCancel ?? (() => form?.resetFields()));
  return (
    <Form
      layout="vertical" // FIXME: Is it needed?
      initialValues={initialValues}
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
          <FullWidthSpace size={32} direction="vertical">
            {children}
          </FullWidthSpace>
        ) : null}
      </ConfigurationCard>
    </Form>
  );
};

export default CardForm;
