import {FC} from 'react';

import {Tooltip} from 'antd';

import {QuestionCircleOutlined} from '@ant-design/icons';

const LabelSelectorHelpIcon: FC = () => (
  <span style={{display: 'inline-block', position: 'relative'}}>
    <Tooltip title="Resources follow the official Kubernetes selector pattern. Multiple selectors are grouped by an AND operator">
      <QuestionCircleOutlined style={{margin: '0 6px'}} />
    </Tooltip>
  </span>
);

export default LabelSelectorHelpIcon;
