import {intervalToDuration} from 'date-fns';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {constructExecutedString} from '@utils/formatDate';

import Colors from '@styles/Colors';

import {DetailsWrapper, ItemColumn, ItemRow, ItemWrapper} from './TableRow.styled';

const TableRow: React.FC<{data: any}> = props => {
  const {data} = props;
  const {status, number, startTime, endTime, name, id} = data;

  const getIntervalExecTime = () => {
    try {
      return constructExecutedString(intervalToDuration({start: new Date(startTime || {}), end: new Date()}));
    } catch (err) {
      console.log(err);
    }
  };

  const getExecDuration = () => {
    try {
      return constructExecutedString(
        intervalToDuration({
          start: new Date(startTime),
          end: new Date(endTime === '0001-01-01T00:00:00Z' ? {} : endTime),
        })
      );
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const executedTime = getIntervalExecTime();
  const executionDuration = status === 'running' ? 'running' : getExecDuration();

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
              {executionDuration || 'No data'}
            </Text>
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
              Executed: {executedTime} ago
            </Text>
          </ItemColumn>
        </ItemRow>
      </DetailsWrapper>
    </ItemWrapper>
  );
};

export default TableRow;
