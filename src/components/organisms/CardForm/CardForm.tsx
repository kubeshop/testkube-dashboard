import {Children, FC, PropsWithChildren, ReactNode, useEffect, useRef, useState} from 'react';

import {Form, FormInstance} from 'antd';
import {FormLayout} from 'antd/lib/form/Form';
import {FormLabelAlign} from 'antd/lib/form/interface';

import {isEqual} from 'lodash';

import {FullWidthSpace} from '@custom-antd';

import {useLastCallback} from '@hooks/useLastCallback';

import {ErrorNotification, ErrorNotificationConfig} from '@models/notifications';

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
  const [currentInitialValues, setCurrentInitialValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorNotificationConfig[]>();
  const validateFieldsRef = useRef<() => Promise<any>>();

  const cancel = useLastCallback(() => {
    setErrors(undefined);
    if (onCancel) {
      onCancel();
    } else {
      form?.resetFields();
    }
  });
  const confirm = useLastCallback(() => {
    setErrors(undefined);
    Promise.resolve(validateFieldsRef.current?.())
      .then(onConfirm)
      .catch((err: ErrorNotification) => {
        if ('errors' in err) {
          setErrors(err.errors);
        } else if (err.title || err.message) {
          setErrors([err]);
        }
      });
  });

  useEffect(() => {
    if (form && !isEqual(initialValues, currentInitialValues)) {
      form?.setFieldsValue(initialValues);
      setCurrentInitialValues(initialValues);
    }
  }, [initialValues]);

  useEffect(cancel, [currentInitialValues]);

  return (
    <Form
      layout={layout}
      initialValues={currentInitialValues}
      form={form}
      labelAlign={labelAlign}
      name={name}
      disabled={disabled}
      onFieldsChange={onFieldsChange}
      onFinish={confirm}
    >
      <Form.Item noStyle shouldUpdate>
        {({validateFields}) => {
          validateFieldsRef.current = validateFields;
          return (
            <ConfigurationCard
              title={title}
              description={description}
              footerText={footer}
              confirmButtonText={confirmLabel}
              forceEnableButtons={wasTouched}
              enabled={!readOnly}
              isWarning={isWarning}
              errors={errors}
              onConfirm={noop}
              onCancel={form || onCancel ? cancel : undefined}
            >
              {Children.count(children) ? (
                <FullWidthSpace size={spacing} direction="vertical">
                  {children}
                </FullWidthSpace>
              ) : null}
            </ConfigurationCard>
          );
        }}
      </Form.Item>
    </Form>
  );
};

export default CardForm;
