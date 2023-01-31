import React, {useMemo} from 'react';

import {Dropdown, Menu} from 'antd';

import {Dots, StatusIcon} from '@atoms';

import {Text, Tooltip} from '@custom-antd';

import useIsRunning from '@hooks/useIsRunning';

import {displayTimeBetweenDates} from '@utils/displayTimeBetweenDates';
import {formatDuration, formatExecutionDate} from '@utils/formatDate';

import Colors from '@styles/Colors';

import {DetailsWrapper, ItemColumn, ItemRow, ItemWrapper} from './TableRow.styled';

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
      actionsArray.push({key: 1, label: <span onClick={abortExecution}>Abort execution</span>});
    }

    return actionsArray;
  };

  const renderedExecutionActions = useMemo(() => {
    return renderExecutionActions();
  }, [isRunning]);

  const menu = <Menu items={renderedExecutionActions} />;

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
            <Text className="regular small" color={Colors.slate200}>
              {durationMs ? formatDuration(durationMs / 1000) : isRunning ? 'Running' : 'No data'}
            </Text>
            {renderedExecutionActions && renderedExecutionActions.length ? (
              <div
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <Dropdown overlay={menu} placement="bottom">
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
