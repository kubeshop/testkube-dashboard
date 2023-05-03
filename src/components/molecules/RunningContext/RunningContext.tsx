import React, {memo, useContext} from 'react';
import {Link} from 'react-router-dom';

import {Tooltip} from 'antd';

import {Entity} from '@models/entity';

import {setSettingsTabConfig} from '@redux/reducers/configSlice';

import {ExternalLink} from '@atoms';

import {Text} from '@custom-antd';

import {hasProtocol} from '@utils/strings';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

export enum RunningContextType {
  userUI = 'user-ui',
  userCLI = 'user-cli',
  testSuite = 'testsuite',
  testTrigger = 'testtrigger',
  scheduler = 'scheduler',
  default = 'default',
}

type RunningContextProps = {
  type?: RunningContextType;
  context?: string;
  unselectRow: () => void;
  entity: Entity;
};

const RunningContext: React.FC<RunningContextProps> = props => {
  const {type = RunningContextType.default, context = '', unselectRow, entity} = props;

  const {dispatch} = useContext(MainContext);

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
            unselectRow();
            dispatch(setSettingsTabConfig({entity, tab: 'Scheduling'}));
          }}
        >
          {context}
        </ExternalLink>
      </>
    ) : (
      'Scheduler'
    ),
    testsuite: context ? (
      <Link to={`/test-suites/executions/test-suite/execution/${context}`}>{context}</Link>
    ) : (
      'Test Suite'
    ),
    testtrigger: <Link to="/triggers">{context || 'Test Trigger'}</Link>,
    default: 'Unknown run context',
  };

  return (
    <Tooltip title={context}>
      <Text color={Colors.slate50}>{runContextMap[type]}</Text>
    </Tooltip>
  );
};

export default memo(RunningContext);
