import {Handle, Position} from 'reactflow';

import {ClockCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

import {ExecutorIcon} from '@atoms';

import {Text} from '@custom-antd';

import {LocalStep} from '@models/testSuite';

import {DotsDropdown} from '@molecules';

import {TestNodeContainer, TestNodeNameContainer} from '../SettingsTests.styled';

type StepNodeProps = {
  data: {
    item: LocalStep;
    group: number;
    removeNode: (id: string, col: number) => void;
  };
  id: string;
};

const StepNode: React.FC<StepNodeProps> = props => {
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
        <DotsDropdown items={[{key: 1, label: <span onClick={() => data.removeNode(id, data.group)}>Remove</span>}]} />
      </TestNodeContainer>
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </>
  );
};

export default StepNode;
