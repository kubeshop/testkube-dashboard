import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Tooltip} from 'antd';

import {ExternalLink} from '@atoms';

import {Text} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {Entity} from '@models/entity';

import Colors from '@styles/Colors';

import {hasProtocol} from '@utils/strings';

export enum RunningContextType {
  userUI = 'user-ui',
  userCLI = 'user-cli',
  testSuite = 'testsuite',
  testTrigger = 'testtrigger',
  scheduler = 'scheduler',
  default = 'default',
}

type RunningContextProps = {
  id: string;
  type?: RunningContextType;
  context?: string;
  entity: Entity;
};

const RunningContext: React.FC<RunningContextProps> = props => {
  const {id, type = RunningContextType.default, context = '', entity} = props;
  const onOpenSchedule = useDashboardNavigate(`/${entity}/${id}/settings/scheduling`);

  const runContextMap = {
    'user-ui': 'Manual UI',
    'user-cli': context ? (
      hasProtocol(context) ? (
        <>
          Manual CLI (<ExternalLink href={context}>Context</ExternalLink>)
        </>
      ) : (
        `Manual CLI (${context})`
      )
    ) : (
      'Manual CLI'
    ),
    scheduler: context ? (
      <>
        Scheduler <ExternalLink onClick={onOpenSchedule}>{context}</ExternalLink>
      </>
    ) : (
      'Scheduler'
    ),
    testsuite: context ? (
      // TODO: It would be good to point to execution, but we don't have ID
      <Link to={`/test-suites/${context.replace(/^ts-/, '').replace(/-[0-9]+$/, '')}`}>{context}</Link>
    ) : (
      'Test Suite'
    ),
    testtrigger: <Link to={`/triggers/${context}`}>{context || 'Test Trigger'}</Link>,
    default: 'Unknown run context',
  };

  return (
    <Tooltip title={context}>
      <Text color={Colors.slate50}>{runContextMap[type]}</Text>
    </Tooltip>
  );
};

export default memo(RunningContext);
