import React, {useMemo} from 'react';

import {Tooltip} from 'antd';

import {StatusIcon} from '@atoms';

import {DotsDropdown} from '@molecules';

import {Text} from '@custom-antd';

import useIsRunning from '@hooks/useIsRunning';

import {displayTimeBetweenDates} from '@utils/displayTimeBetweenDates';
import {formatDuration, formatExecutionDate} from '@utils/formatDate';

import {Permissions, usePermission} from '@permissions/base';

import Colors from '@styles/Colors';

import {DetailsWrapper, DotsWrapper, ItemColumn, ItemRow, ItemWrapper} from './TableRow.styled';

const TableRow: React.FC<{data: any; onAbortExecution: any}> = props => {
  const {data, onAbortExecution} = props;
  const {status, number, startTime, name, id, durationMs} = data;

  const isRunning = useIsRunning(status);
  const mayManageExecution = usePermission(Permissions.manageEntityExecution);

  const abortExecution = () => {
    if (onAbortExecution) {
      onAbortExecution(id);
    }
  };

  const renderExecutionActions = () => {
    let actionsArray = [];

    if (isRunning) {
      actionsArray.push({key: 1, label: <span onClick={abortExecution}>Abort execution</span>});
    }

    return actionsArray;
  };

  const renderedExecutionActions = useMemo(() => {
    return renderExecutionActions();
  }, [isRunning]);

  return (
    <ItemWrapper key={id}>
      <StatusIcon status={status} />
      <DetailsWrapper>
        <ItemRow $flex={1}>
          <ItemColumn>
            <Text className="regular big" color={Colors.slate300}>
              {name}
            </Text>
          </ItemColumn>
          <ItemColumn>
            <Text color={Colors.slate200}>
              {durationMs ? formatDuration(durationMs / 1000) : isRunning ? 'Running' : 'No data'}
            </Text>
            {renderedExecutionActions &&
            renderedExecutionActions.length &&
            mayManageExecution ? (
              <DotsWrapper
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <DotsDropdown items={renderedExecutionActions} withPadding={false} />
              </DotsWrapper>
            ) : null}
          </ItemColumn>
        </ItemRow>
        <ItemRow $flex={1}>
          <ItemColumn>
            {number ? <Text color={Colors.slate400}>#{number}</Text> : null}
            <Text color={Colors.slate400}>Executed:</Text>
            <Tooltip
              overlay={<>{formatExecutionDate(new Date(startTime))}</>}
              placement="bottomRight"
              mouseEnterDelay={0.39}
              mouseLeaveDelay={0.1}
            >
              <Text color={Colors.slate400}>
                {displayTimeBetweenDates(new Date(), new Date(startTime)).long}
              </Text>
            </Tooltip>
          </ItemColumn>
        </ItemRow>
      </DetailsWrapper>
    </ItemWrapper>
  );
};

export default TableRow;
