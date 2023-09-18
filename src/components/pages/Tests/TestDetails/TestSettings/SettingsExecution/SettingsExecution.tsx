import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import PostRun from './PostRun';
import PreRun from './PreRun';

const SettingsExecution: React.FC = () => {
  const isWritable = useSystemAccess(SystemAccess.agent);
  return (
    <>
      <PreRun readOnly={!isWritable} />
      <PostRun readOnly={!isWritable} />
    </>
  );
};

export default SettingsExecution;
