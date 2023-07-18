import {Handle, Position} from 'reactflow';

import {ClockCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

import {ExecutorIcon} from '@atoms';

import {Text} from '@custom-antd';

import {LocalStep} from '@models/testSuite';

import {DotsDropdown} from '@molecules';

import {TestNodeContainer} from './SettingsTests.styled';

type CustomNodeProps = {
  data: LocalStep & {
    group: number | string;
    removeNode: (id: string, col: number | string) => void;
  };
  id: string;
};

const CustomNode: React.FC<CustomNodeProps> = props => {
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

export default CustomNode;
