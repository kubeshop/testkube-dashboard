import {useContext, useMemo, useState} from 'react';

import {Select, Tooltip} from 'antd';

import {WarningOutlined} from '@ant-design/icons';

import parser from 'cron-parser';

import {Text} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

import {Permissions, usePermission} from '@permissions/base';

import {EntityDetailsContext} from '@contexts';

import {StyledSpace} from '../Settings.styled';
import {namingMap, updateRequestsMap} from '../utils';
import CronInput from './CronInput';
import NextExecution from './NextExecution';
import {StyledColumn, StyledCronFormat, StyledRow} from './Schedule.styled';
import {custom, quickOptions} from './utils';

const Schedule: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);
  const enabled = usePermission(Permissions.editEntity);

  const [updateEntity] = updateRequestsMap[entity]();

  const name = entityDetails?.name;
  const schedule = entityDetails?.schedule;

  const [cronString, setCronString] = useState(schedule || '');
  const [wasTouched, setWasTouched] = useState(false);

  const onSave = () => {
    updateEntity({
      id: name,
      data: {
        ...entityDetails,
        schedule: cronString,
      },
    })
      .then(res => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} schedule was successfully updated.`);
        });
        setWasTouched(false);
      })
      .catch(err => {
        displayDefaultErrorNotification(err);
      });
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
    <ConfigurationCard
      title="Schedule"
      description={`You can add a cronjob like schedule for your ${namingMap[entity]} which will then be executed automatically.`}
      onConfirm={onSave}
      onCancel={onCancel}
      isButtonsDisabled={!wasTouched}
      enabled={enabled}
    >
      <StyledSpace direction="vertical" size={32}>
        <StyledColumn>
          <Text className="middle regular">Schedule template</Text>
          <Select
            disabled={!enabled}
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
                <CronInput
                  title="Minute"
                  disabled={!enabled}
                  value={minute}
                  onChange={value => onCronInput(value, 0)}
                />
                <CronInput title="Hour" disabled={!enabled} value={hour} onChange={value => onCronInput(value, 1)} />
                <CronInput title="Day" disabled={!enabled} value={day} onChange={value => onCronInput(value, 2)} />
                <CronInput title="Month" disabled={!enabled} value={month} onChange={value => onCronInput(value, 3)} />
                <CronInput
                  title="Day / Week"
                  disabled={!enabled}
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
      </StyledSpace>
    </ConfigurationCard>
  );
};

export default Schedule;
