import {FC} from 'react';

import {QuestionCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

const LabelSelectorHelpIcon: FC = () => (
  <span style={{display: 'inline-block', position: 'relative'}}>
    <Tooltip title="Resources follow the official Kubernetes selector pattern. Multiple selectors are grouped by an AND operator">
      <QuestionCircleOutlined style={{margin: '0 6px'}} />
    </Tooltip>
  </span>
);

export default LabelSelectorHelpIcon;
