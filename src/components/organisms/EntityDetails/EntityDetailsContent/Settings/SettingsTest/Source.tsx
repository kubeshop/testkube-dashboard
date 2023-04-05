import {useContext, useEffect, useMemo, useState} from 'react';
import {useDeepCompareEffect} from 'react-use';

import {Form} from 'antd';

import {Type} from 'class-transformer';
import {ValidateNested} from 'class-validator';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {ConfigurationCard, notificationCall} from '@molecules';
import {SourceInput, SourceTypeInput, useControlledForm} from '@atoms';

import {
  customTypeFormFields,
  fileContentFormFields,
  gitFormFieldsEdit,
  stringContentFormFields,
} from '@wizards/AddTestWizard/utils';

import {testSourceLink} from '@utils/externalLinks';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

import {Source as SourceModel, CustomSource, SourceType} from '@models';

import {StyledSpace} from '../Settings.styled';

const dummySecret = '******';

const additionalFields: any = {
  git: gitFormFieldsEdit,
  'file-uri': fileContentFormFields,
  custom: customTypeFormFields,
  string: stringContentFormFields,
};

class SourceFormDto {
  source?: CustomSource | SourceType;

  @ValidateNested()
  @Type(() => SourceModel)
  content!: SourceModel;
}

const Source = () => {
  const {entityDetails} = useContext(EntityDetailsContext);

  const {type} = entityDetails;

  const executors = useAppSelector(selectExecutors);
  const selectedExecutor = useMemo(() => executors.find(x => x.executor.types?.includes(type)), [executors, type]);

  const customSources = useAppSelector(selectSources);
  const initialCustomSource = useMemo(
    () => customSources.find(source => source.name === entityDetails.source),
    [customSources, entityDetails],
  );

  const [dto, setDto] = useState<SourceFormDto>({
    source: initialCustomSource || entityDetails.content?.type,
    content: entityDetails.content,
  });
  useDeepCompareEffect(() => setDto({
    source: initialCustomSource,
    content: entityDetails.content,
  }), [initialCustomSource, entityDetails.content]);

  useEffect(() => {
    form.resetFields();
    if (typeof dto.source === 'string') {
      setDto({...dto, content: {...dto.content, type: dto.source}});
    } else {
      setDto({...dto, content: dto.source!});
    }
  }, [dto.source]);

  const [updateTest] = useUpdateTestMutation();

  const {form, errors, formProps, useChange, useSubmit} = useControlledForm(SourceFormDto, dto);
  useChange(setDto);
  useSubmit(() => {
    if (errors.length > 0) {
      return;
    }

    updateTest({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        source: (dto.source as CustomSource)?.name || '',
        content: dto.content,
      },
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `Test source was successfully updated.`);
        });
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  });

  return (
    <Form name="test-settings-source" layout="vertical" labelAlign="right" {...formProps}>
      <ConfigurationCard
        title="Source"
        description="Define the source for your test"
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          setDto({
            source: initialCustomSource || entityDetails.content?.type,
            content: entityDetails.content,
          });
          // FIXME: It makes the form blinking
          form.resetFields();
        }}
        footerText={
          <>
            Learn more about{' '}
            <a href={testSourceLink} target="_blank">
              test sources
            </a>
          </>
        }
        disabled={errors.length > 0}
      >
        <StyledSpace size={24} direction="vertical">
          <Form.Item noStyle name='source'>
            <SourceTypeInput executor={selectedExecutor!} sources={customSources} />
          </Form.Item>
          <Form.Item noStyle name='content'>
            <SourceInput executor={selectedExecutor!} source={typeof dto.source === 'string' ? undefined : dto.source} />
          </Form.Item>
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Source;
