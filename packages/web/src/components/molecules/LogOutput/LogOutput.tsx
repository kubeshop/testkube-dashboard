import React, {memo} from 'react';

import {isFeatureEnabled} from '@src/utils/apiInfo';

import LogOutputV1 from './LogOutputV1';
import LogOutputV2 from './LogOutputV2';
import {LogOutputProps} from './useLogOutput';

const LogOutput: React.FC<LogOutputProps> = props => {
  const isV2 = isFeatureEnabled('logsV2');
  return <>{isV2 ? <LogOutputV2 {...props} /> : <LogOutputV1 {...props} />}</>;
};

export default memo(LogOutput);
