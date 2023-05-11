import {CheckCircleFilled, LoadingOutlined, WarningFilled} from '@ant-design/icons';

import Colors from '@styles/Colors';

export enum TooltipStatus {
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
  None = 'none',
}

export const tooltipIcons: Record<TooltipStatus, JSX.Element | undefined> = {
  loading: <LoadingOutlined style={{cursor: 'auto'}} />,
  success: <CheckCircleFilled style={{color: Colors.lime400, cursor: 'auto', paddingBottom: '2px'}} />,
  error: <WarningFilled style={{color: Colors.amber400, paddingBottom: '2px'}} />,
  none: undefined,
};

export const getValidationTooltip = (status: TooltipStatus, message?: string) => {
  if (!tooltipIcons[status]) {
    return undefined;
  }

  if (status === 'error') {
    return {title: message, icon: tooltipIcons[status]};
  }

  return {icon: tooltipIcons[status]};
};
