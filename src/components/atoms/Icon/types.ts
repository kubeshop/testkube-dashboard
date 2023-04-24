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
    | 'error'
    | 'queued';
  component?: IconComponentProps['component'];
  style?: React.CSSProperties;
};
