import {intervalToDuration} from 'date-fns';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {constructExecutedString} from '@utils/formatDate';

import Colors from '@styles/Colors';

import {DetailsWrapper, ItemColumn, ItemRow, ItemWrapper} from './EntityExecutionsContent.styled';

const TableRow: React.FC<{data: any}> = props => {
  const {data} = props;
  const {status, index, duration, startTime, name} = data;

  const executionDuration = status === 'running' ? 'running' : duration;
  const executedTime = constructExecutedString(intervalToDuration({start: new Date(startTime || ''), end: new Date()}));

  return (
    <ItemWrapper>
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
              {executionDuration}
            </Text>
          </ItemColumn>
        </ItemRow>
        <ItemRow $flex={1}>
          <ItemColumn>
            <Text className="regular small" color={Colors.slate400}>
              #{index}
            </Text>
            <Text className="regular small" color={Colors.slate400}>
              manual
            </Text>
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
