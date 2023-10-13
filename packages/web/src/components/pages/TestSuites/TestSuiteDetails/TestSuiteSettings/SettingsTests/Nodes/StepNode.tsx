import {Handle, Position} from 'reactflow';

import {ClockCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

import {ExecutorIcon} from '@atoms';

import {Text} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {LocalStep} from '@models/testSuite';

import {DotsDropdown} from '@molecules';

import {TestNodeContainer, TestNodeNameContainer} from '../SettingsTests.styled';

type StepNodeProps = {
  data: {
    item: LocalStep;
    group: number;
    disabled?: boolean;
    deleteNode: (id: string, group: number) => void;
  };
  id: string;
};

const StepNode: React.FC<StepNodeProps> = props => {
  const {data, id} = props;
  const {type, test, delay} = data.item;
  const redirectToTestSettings = useDashboardNavigate((next: string) => `/tests/${test}/settings/${next}`);

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
        {data.disabled ? undefined : (
          <DotsDropdown
            items={[
              {key: 1, label: <span onClick={() => redirectToTestSettings('test')}>Configure this test</span>},
              {key: 2, label: <span onClick={() => data.deleteNode(id, data.group)}>Remove from this pipeline</span>},
            ]}
          />
        )}
      </TestNodeContainer>
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </>
  );
};

export default StepNode;
