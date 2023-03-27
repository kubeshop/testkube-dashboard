import React, {useMemo} from 'react';

import {Dropdown} from 'antd';
import {ItemType} from 'antd/lib/menu/hooks/useItems';

import {Dots, StatusIcon} from '@atoms';

import {Text, Tooltip} from '@custom-antd';

import useIsRunning from '@hooks/useIsRunning';

import {displayTimeBetweenDates} from '@utils/displayTimeBetweenDates';
import {formatDuration, formatExecutionDate} from '@utils/formatDate';

import Colors from '@styles/Colors';

import {DetailsWrapper, ItemColumn, ItemRow, ItemWrapper, StatusText} from './TableRow.styled';

const TableRow: React.FC<{data: any; onAbortExecution: any}> = props => {
  const {data, onAbortExecution} = props;
  const {status, number, startTime, name, id, durationMs} = data;

  const isRunning = useIsRunning(status);

  const abortExecution = () => {
    if (onAbortExecution) {
      onAbortExecution(id);
    }
  };

  const renderExecutionActions = () => {
    let actionsArray = [];

    if (isRunning) {
      actionsArray.push({key: 1, children: <span onClick={abortExecution}>Abort execution</span>});
    }

    return actionsArray;
  };

  const renderedExecutionActions: ItemType[] = useMemo(() => {
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
            <StatusText className="regular small" color={Colors.slate200}>
              {durationMs ? formatDuration(durationMs / 1000) : isRunning ? 'Running' : 'No data'}
            </StatusText>
            {renderedExecutionActions && renderedExecutionActions.length ? (
              <div
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <Dropdown menu={{items: renderedExecutionActions}} placement="bottom">
                  <div style={{width: 20}}>
                    <Dots color={Colors.grey450} />
                  </div>
                </Dropdown>
              </div>
            ) : null}
          </ItemColumn>
        </ItemRow>
        <ItemRow $flex={1}>
          <ItemColumn>
            {number ? (
              <Text className="regular small" color={Colors.slate400}>
                #{number}
              </Text>
            ) : null}
            <Text className="regular small" color={Colors.slate400}>
              Executed:
            </Text>
            <Tooltip
              overlay={<>{formatExecutionDate(new Date(startTime))}</>}
              placement="bottomRight"
              color={Colors.slate700}
              mouseEnterDelay={0.39}
              mouseLeaveDelay={0.1}
            >
              <Text className="regular small" color={Colors.slate400}>
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
