import React, {memo, useContext} from 'react';
import {Link} from 'react-router-dom';

import {Tooltip} from 'antd';

import {ExternalLink} from '@atoms';

import {DashboardContext} from '@contexts';

import {Text} from '@custom-antd';

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
  onClose: () => void;
  entity: Entity;
};

const RunningContext: React.FC<RunningContextProps> = props => {
  const {id, type = RunningContextType.default, context = '', onClose, entity} = props;

  const {navigate} = useContext(DashboardContext);

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
        Scheduler{' '}
        <ExternalLink
          onClick={() => {
            onClose();
            navigate(`/${entity}/${id}/settings/scheduling`);
          }}
        >
          {context}
        </ExternalLink>
      </>
    ) : (
      'Scheduler'
    ),
    testsuite: context ? (
      // TODO: Point to actual execution?
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
