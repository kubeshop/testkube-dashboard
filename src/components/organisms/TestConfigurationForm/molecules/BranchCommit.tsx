import {useState} from 'react';
import {useFirstMountState} from 'react-use';

import {FormItem} from '@custom-antd';

import {Branch, BranchCommitSwitcher, Commit} from '.';
import {StyledFormSpace} from '../TestConfigurationForm.styled';

const BranchCommit = () => {
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
            <BranchCommitSwitcher value={switcherValue} onChange={setSwitcherValue} />
            {switcherValue === 'branch' ? <Branch /> : <Commit />}
          </StyledFormSpace>
        );
      }}
    </FormItem>
  );
};

export default BranchCommit;
