import {format} from 'date-fns';

import {StatusIcon, TestRunnerIcon} from '@atoms';

import {Text} from '@custom-antd';

import {LabelsList} from '@molecules';

import {executionDateFormat} from '@utils/strings';

import Colors from '@styles/Colors';

import {DetailsWrapper, ItemColumn, ItemRow, ItemWrapper} from './EntityGrid.styled';

const EntityGridItem: React.FC<any> = props => {
  const {item, onClick} = props;
  const {dataItem, latestExecution} = item;

  const status = latestExecution ? latestExecution?.executionResult?.status || latestExecution?.status : 'pending';
  const startDate = latestExecution?.startTime ? format(new Date(latestExecution?.startTime), executionDateFormat) : '';

  return (
    <ItemWrapper onClick={onClick}>
      <StatusIcon status={status} />
      <DetailsWrapper>
        <ItemRow $flex={1}>
          <ItemColumn>
            {dataItem?.type ? <TestRunnerIcon icon={dataItem?.type} /> : null}
            <Text className="regular big">{dataItem?.name}</Text>
            {dataItem?.labels ? <LabelsList labels={dataItem?.labels} /> : null}
          </ItemColumn>
          <ItemColumn>
            <Text className="regular small" color={Colors.slate200}>
              {startDate}
            </Text>
          </ItemColumn>
          {/* <ItemColumn /> */}
        </ItemRow>
        <ItemRow $flex={2} />
      </DetailsWrapper>
    </ItemWrapper>
  );
};

export default EntityGridItem;
