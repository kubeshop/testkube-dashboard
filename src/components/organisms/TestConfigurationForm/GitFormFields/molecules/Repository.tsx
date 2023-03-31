import {Input} from 'antd';

import {CheckCircleOutlined, LoadingOutlined, QuestionCircleOutlined, WarningOutlined} from '@ant-design/icons';

import {FormItem, Text} from '@custom-antd';

import {required, url} from '@utils/form';

import Colors from '@styles/Colors';

export const tooltipIcons: {[key: string]: JSX.Element} = {
  loading: <LoadingOutlined />,
  success: <CheckCircleOutlined style={{color: Colors.lime400}} />,
  error: <WarningOutlined style={{color: Colors.amber400}} />,
  default: <QuestionCircleOutlined />,
};

type RepositoryProps = {
  labelState?: {
    status: string;
    message: string;
  };
};

const Repository: React.FC<RepositoryProps> = props => {
  const {
    labelState = {
      status: 'default',
      message: 'We do currently only support checking out repositories via https',
    },
  } = props;

  return (
    <FormItem
      name="uri"
      label={<Text className="regular middle">Git repository URI</Text>}
      rules={[required, url]}
      tooltip={{title: labelState.message, icon: tooltipIcons[labelState.status]}}
      required
    >
      <Input placeholder="e.g.: https://github.com/myCompany/myRepo.git" />
    </FormItem>
  );
};

export default Repository;
