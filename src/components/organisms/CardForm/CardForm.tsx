import {Children, FC, PropsWithChildren, ReactNode, useEffect, useState} from 'react';

import {Form, FormInstance} from 'antd';
import {FormLayout} from 'antd/lib/form/Form';
import {FormLabelAlign} from 'antd/lib/form/interface';

import {isEqual} from 'lodash';

import {FullWidthSpace} from '@custom-antd';

import {useLastCallback} from '@hooks/useLastCallback';
import {usePrompt} from '@hooks/usePrompt';

import {ErrorNotification, ErrorNotificationConfig} from '@models/notifications';

import {ConfigurationCard} from '@molecules';

interface CardFormProps {
  name: string;
  title: ReactNode;
  description: ReactNode;
  footer?: ReactNode;
  headerAction?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  wasTouched?: boolean;
  isWarning?: boolean;
  form?: FormInstance;
  labelAlign?: FormLabelAlign;
  layout?: FormLayout;
  initialValues?: any;
  confirmLabel?: string;
  monitLeave?: boolean;
  monitLeaveMessage?: string;
  onFieldsChange?: (...args: any) => void;
  onValuesChange?: (...args: any) => void;
  spacing?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const CardForm: FC<PropsWithChildren<CardFormProps>> = ({
  name,
  title,
  description,
  footer,
  headerAction,
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
  monitLeave,
  monitLeaveMessage = 'You have unsaved changes. Are you sure you want to leave?',
  children,
  onFieldsChange,
  onValuesChange,
  onConfirm,
  onCancel,
}) => {
  const [currentForm] = Form.useForm(form);
  const [currentInitialValues, setCurrentInitialValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorNotificationConfig[]>();
  const [loading, setLoading] = useState<boolean>();

  usePrompt(monitLeaveMessage, () => monitLeave && (currentForm.isFieldsTouched() || wasTouched));

  const cancel = useLastCallback(() => {
    setErrors(undefined);
    if (loading) {
      return;
    }
    if (onCancel) {
      onCancel();
    } else {
      form?.resetFields();
    }
  });
  const confirm = useLastCallback(() => {
    if (loading) {
      return;
    }
    setErrors(undefined);
    setLoading(true);
    Promise.resolve()
      .then(() => currentForm.validateFields())
      .then(onConfirm)
      .catch((err: ErrorNotification) => {
        if ('errors' in err) {
          setErrors(err.errors);
        } else if (err.title || err.message) {
          setErrors([err]);
        }
      })
      .then(() => {
        setLoading(false);
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
      form={currentForm}
      labelAlign={labelAlign}
      name={name}
      disabled={disabled || loading}
      onFieldsChange={onFieldsChange}
      onValuesChange={onValuesChange}
      onFinish={confirm}
    >
      <Form.Item noStyle shouldUpdate>
        <ConfigurationCard
          title={title}
          description={description}
          footer={footer}
          headerAction={headerAction}
          confirmLabel={confirmLabel}
          wasTouched={wasTouched}
          readOnly={readOnly}
          loading={loading}
          isWarning={isWarning}
          errors={errors}
          onCancel={form || onCancel ? cancel : undefined}
        >
          {Children.count(children) ? (
            <FullWidthSpace size={spacing} direction="vertical">
              {children}
            </FullWidthSpace>
          ) : null}
        </ConfigurationCard>
      </Form.Item>
    </Form>
  );
};

export default CardForm;
