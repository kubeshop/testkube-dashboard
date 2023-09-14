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
    | 'cloudMigrate'
    | 'statusPage'
    | 'operational'
    | 'major_outage'
    | 'partial_outage'
    | 'unknown';
  component?: IconComponentProps['component'];
  style?: React.CSSProperties;
};
