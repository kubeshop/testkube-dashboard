import {useContext, useState} from 'react';

import {Select, Tooltip} from 'antd';

import {WarningOutlined} from '@ant-design/icons';

import parser from 'cron-parser';
import {formatDuration, intervalToDuration} from 'date-fns';

import {Entity} from '@models/entity';

import {Text} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import {useUpdateTestSuiteMutation} from '@services/testSuites';
import {useUpdateTestMutation} from '@services/tests';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

import {EntityDetailsContext} from '@contexts';

import {StyledSpace} from '../Settings.styled';
import CronInput from './CronInput';
import {StyledColumn, StyledCronFormat, StyledRow} from './Schedule.styled';

const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};

const quickOptions = [
  {
    label: 'Every 5 minutes',
    value: '*/5 * * * *',
  },
  {
    label: 'Every 30 minutes',
    value: '*/30 * * * *',
  },
  {
    label: 'Every hour',
    value: '0 * * * *',
  },
  {
    label: 'Every day',
    value: '0 0 * * *',
  },
  {
    label: 'Every week',
    value: '0 0 * * 0',
  },
  {
    label: 'Every month',
    value: '0 0 1 * *',
  },
];

const defaultCronString = '* * * * *';

const Schedule: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);

  const [updateTest] = useUpdateTestMutation();
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const updateRequestsMap: {[key in Entity]: any} = {
    'test-suites': updateTestSuite,
    tests: updateTest,
  };
  const name = entityDetails?.name;
  const schedule = entityDetails?.schedule;

  const [cronString, setCronString] = useState(schedule || defaultCronString);
  const [wasTouched, setWasTouched] = useState(false);
  const [isValidFormat, setIsValidFormat] = useState(true);

  if (!entity || !entityDetails) {
    return null;
  }

  const onSave = () => {
    updateRequestsMap[entity]({
      id: name,
      data: {
        ...entityDetails,
        schedule: cronString,
      },
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} schedule was successfully updated.`);
        });
        setWasTouched(false);
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  };

  const onCancel = () => {
    setWasTouched(false);
    setCronString(schedule || defaultCronString);
  };

  const onCronInput = (value: string, position: number) => {
    const split = cronString.split(' ');
    setCronString([...split.slice(0, position), value, ...split.slice(position + 1)].join(' '));
    setWasTouched(true);
  };

  const { nextExecution, isValidFormat } = useMemo(() => {
    try {
      const nextExecution = parser.parseExpression(cronString).next().toDate();
      const duration = intervalToDuration({start: new Date(), end: nextExecution});
      return { nextExecution: `in ${formatDuration(duration)}`, isValidFormat: true };
    } catch (e) {
      return { nextExecution: 'Invalid cron format', isValidFormat: false };
    }
  }, [ cronString ]);

  const [minute, hour, day, month, dayOfWeek] = cronString.split(' ');

  return (
    <ConfigurationCard
      title="Schedule"
      description={`You can add a cronjob like schedule for your ${namingMap[entity]} which will then be executed automatically.`}
      onConfirm={onSave}
      onCancel={onCancel}
      isButtonsDisabled={!wasTouched}
    >
      <StyledSpace direction="vertical" size={32}>
        <Select
          placeholder="Quick select a schedule template"
          style={{width: '100%'}}
          options={quickOptions}
          onSelect={(value: string) => {
            setCronString(value);
            setWasTouched(true);
          }}
        />
        <StyledColumn>
          <Text className="middle regular">Cron Format</Text>
          <StyledCronFormat>
            <CronInput title="Minute" value={minute} onChange={value => onCronInput(value, 0)} />
            <CronInput title="Hour" value={hour} onChange={value => onCronInput(value, 1)} />
            <CronInput title="Day" value={day} onChange={value => onCronInput(value, 2)} />
            <CronInput title="Month" value={month} onChange={value => onCronInput(value, 3)} />
            <CronInput title="Day / Week" value={dayOfWeek} onChange={value => onCronInput(value, 4)} />
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
              {getNextExecution()}
            </Text>
          </StyledColumn>
        </StyledRow>
      </StyledSpace>
    </ConfigurationCard>
  );
};

export default Schedule;
