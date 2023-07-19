import {Handle, Position} from 'reactflow';

import {ClockCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

import {ExecutorIcon} from '@atoms';

import {Text} from '@custom-antd';

import {LocalStep} from '@models/testSuite';

import {DotsDropdown} from '@molecules';

import {TestNodeContainer} from '../SettingsTests.styled';

type StepNodeProps = {
  data: LocalStep & {
    group: number;
    removeNode: (id: string, col: number) => void;
  };
  id: string;
};

const StepNode: React.FC<StepNodeProps> = props => {
  const {data, id} = props;
  const {type, test, delay} = data;

  const renderText = test || delay;
  return (
    <>
      {data.group === 0 ? null : <Handle type="target" position={Position.Left} />}
      <TestNodeContainer>
        {delay ? <ClockCircleOutlined style={{fontSize: '20px'}} /> : <ExecutorIcon type={type} />}
        <Tooltip title={renderText}>
          <Text className="regular middle" ellipsis>
            {renderText}
          </Text>
        </Tooltip>
        <DotsDropdown
          trigger={['hover']}
          items={[{key: 1, label: <span onClick={() => data.removeNode(id, data.group)}>Remove</span>}]}
        />
      </TestNodeContainer>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default StepNode;
