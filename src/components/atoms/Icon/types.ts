import {CSSProperties} from 'react';

import {IconComponentProps} from '@ant-design/icons/lib/components/Icon';

export type IconProps = {
  name:
    | 'cog'
    | 'documentation'
    | 'discord'
    | 'github'
    | 'passed'
    | 'failed'
    | 'running'
    | 'pending'
    | 'delay'
    | 'cancelled'
    | 'timeout'
    | 'aborted'
    | 'aborting'
    | 'error'
    | 'queued'
    | 'success'
    | 'cloudMigrate';
  component?: IconComponentProps['component'];
  style?: CSSProperties;
};
