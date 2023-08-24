import {FC} from 'react';
import {Handle, Position} from 'reactflow';

import {ClockCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

import {ExecutorIcon} from '@atoms/ExecutorIcon';

import {Text} from '@custom-antd/Typography/Text';

import type {LocalStep} from '@models/testSuite';

import {DotsDropdown} from '@molecules/DotsDropdown';

import {
  TestNodeContainer,
  TestNodeNameContainer,
} from '@pages/TestSuites/TestSuiteDetails/TestSuiteSettings/SettingsTests.styled';

type StepNodeProps = {
  data: {
    item: LocalStep;
    group: number;
    deleteNode: (id: string, group: number) => void;
  };
  id: string;
};

export const StepNode: FC<StepNodeProps> = props => {
  const {data, id} = props;
  const {type, test, delay} = data.item;

  const renderText = test ?? (/^[0-9]+$/.test(`${delay}`) ? `${delay}ms` : delay);
  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <TestNodeContainer>
        {delay ? <ClockCircleOutlined style={{fontSize: '20px'}} /> : <ExecutorIcon type={type} />}
        <Tooltip title={renderText}>
          <TestNodeNameContainer>
            <Text className="regular middle" ellipsis>
              {renderText}
            </Text>
          </TestNodeNameContainer>
        </Tooltip>
        <DotsDropdown items={[{key: 1, label: <span onClick={() => data.deleteNode(id, data.group)}>Delete</span>}]} />
      </TestNodeContainer>
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </>
  );
};
