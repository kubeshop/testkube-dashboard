import {useMemo, useState} from 'react';

import {WarningOutlined} from '@ant-design/icons';
import {Select, Tooltip} from 'antd';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import parser from 'cron-parser';
import {capitalize} from 'lodash';

import {Text} from '@custom-antd';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

import {displayDefaultNotificationFlow} from '@utils/notification';

import CronInput from './CronInput';
import NextExecution from './NextExecution';
import {StyledColumn, StyledCronFormat, StyledRow} from './Schedule.styled';
import {custom, quickOptions} from './utils';

interface ScheduleProps {
  label: string;
  useUpdateEntity: UseMutation<MutationDefinition<any, any, any, any, any>>;
}

const Schedule: React.FC<ScheduleProps> = ({label, useUpdateEntity}) => {
  const {details} = useEntityDetailsPick('details');
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateEntity] = useUpdateEntity();

  const name = details?.name;
  const schedule = details?.schedule;

  const [cronString, setCronString] = useState(schedule || '');
  const [wasTouched, setWasTouched] = useState(false);

  const onSave = () => {
    return updateEntity({
      id: name,
      data: {
        ...details,
        schedule: cronString,
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => {
        setWasTouched(false);
        notificationCall('passed', `${capitalize(label)} schedule was successfully updated.`);
      });
  };

  const onCancel = () => {
    setWasTouched(false);
    setCronString(schedule || '');
  };

  const onCronInput = (value: string, position: number) => {
    const split = cronString.split(' ');

    setCronString([...split.slice(0, position), value, ...split.slice(position + 1)].join(' '));
    setWasTouched(true);
  };

  const [nextExecution, isValidFormat] = useMemo(() => {
    if (!cronString) {
      return ['Not scheduled', true];
    }

    try {
      const nextDate = parser.parseExpression(cronString).next().toDate();

      return [nextDate, true];
    } catch (e) {
      return ['Invalid cron format', false];
    }
  }, [cronString]);

  const templateValue = useMemo(() => {
    if (quickOptions.some(x => x.value === cronString)) {
      return cronString;
    }
    return custom.value;
  }, [cronString]);

  const [minute, hour, day, month, dayOfWeek] = cronString.split(' ');

  return (
    <CardForm
      name="schedule-form"
      title="Schedule"
      description={`You can add a cronjob like schedule for your ${label} which will then be executed automatically.`}
      spacing={32}
      wasTouched={wasTouched}
      disabled={!mayEdit}
      onConfirm={onSave}
      onCancel={onCancel}
    >
      <StyledColumn>
        <Text className="middle regular">Schedule template</Text>
        <Select
          disabled={!mayEdit}
          placeholder="Quick select a schedule template"
          style={{width: '100%'}}
          options={quickOptions}
          onSelect={(value: string) => {
            setCronString(value);
            setWasTouched(true);
          }}
          value={templateValue}
        />
      </StyledColumn>
      {templateValue ? (
        <>
          <StyledColumn>
            <Text className="middle regular">Cron Format</Text>
            <StyledCronFormat>
              <CronInput title="Minute" disabled={!mayEdit} value={minute} onChange={value => onCronInput(value, 0)} />
              <CronInput title="Hour" disabled={!mayEdit} value={hour} onChange={value => onCronInput(value, 1)} />
              <CronInput title="Day" disabled={!mayEdit} value={day} onChange={value => onCronInput(value, 2)} />
              <CronInput title="Month" disabled={!mayEdit} value={month} onChange={value => onCronInput(value, 3)} />
              <CronInput
                title="Day / Week"
                disabled={!mayEdit}
                value={dayOfWeek}
                onChange={value => onCronInput(value, 4)}
              />
            </StyledCronFormat>
          </StyledColumn>
          <StyledRow>
            <StyledColumn>
              <Text className="middle regular" style={{color: isValidFormat ? Colors.slate200 : Colors.amber400}}>
                Cron Preview{' '}
                {!isValidFormat ? (
                  <Tooltip title="Cron input is invalid">
                    <WarningOutlined />
                  </Tooltip>
                ) : null}
              </Text>
              <Text style={{fontFamily: Fonts.robotoMono, color: Colors.slate400}} className="middle regular">
                {cronString}
              </Text>
            </StyledColumn>
            <StyledColumn>
              <Text className="middle regular">Next Execution</Text>
              <Text style={{color: Colors.slate400}} className="middle regular">
                <NextExecution value={nextExecution} />
              </Text>
            </StyledColumn>
          </StyledRow>
        </>
      ) : null}
    </CardForm>
  );
};

export default Schedule;
