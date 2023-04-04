import {Segmented} from 'antd';

type BranchCommitSwitcherProps = {
  value: string | number;
  onChange: (value: string | number) => void;
};

const BranchCommitSwitcher: React.FC<BranchCommitSwitcherProps> = props => {
  const {value, onChange} = props;

  return (
    <Segmented
      options={[
        {label: 'BRANCH', value: 'branch'},
        {label: 'COMMIT', value: 'commit'},
      ]}
      value={value}
      onChange={onChange}
    />
  );
};

export default BranchCommitSwitcher;
