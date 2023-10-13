import {useEntityDetailsPick} from '@store/entityDetails';

import PostRun from './PostRun';
import PreRun from './PreRun';

const SettingsExecution: React.FC = () => {
  const {details} = useEntityDetailsPick('details');
  return (
    <>
      <PreRun readOnly={details.readOnly} />
      <PostRun readOnly={details.readOnly} />
    </>
  );
};

export default SettingsExecution;
