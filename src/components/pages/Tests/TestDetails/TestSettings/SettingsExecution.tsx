import {FC} from 'react';

import {PostRun} from './SettingsExecution/PostRun';
import {PreRun} from './SettingsExecution/PreRun';

export const SettingsExecution: FC = () => (
  <>
    <PreRun />
    <PostRun />
  </>
);
