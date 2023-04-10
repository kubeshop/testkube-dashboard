import {useState} from 'react';
import {useFirstMountState} from 'react-use';

import {FormItem} from '@custom-antd';

import {Branch, Commit, RevisionSwitcher} from '.';
import {StyledFormSpace} from '../../organisms/TestConfigurationForm/TestConfigurationForm.styled';

const Revision = () => {
  const [switcherValue, setSwitcherValue] = useState<string | number>('branch');

  const isFirst = useFirstMountState();

  return (
    <FormItem noStyle shouldUpdate>
      {({getFieldValue}) => {
        const commit = getFieldValue('commit');

        if (isFirst) {
          setSwitcherValue(commit ? 'commit' : 'branch');
        }

        return (
          <StyledFormSpace size={24} direction="vertical">
            <RevisionSwitcher value={switcherValue} onChange={setSwitcherValue} />
            {switcherValue === 'branch' ? <Branch /> : <Commit />}
          </StyledFormSpace>
        );
      }}
    </FormItem>
  );
};

export default Revision;
