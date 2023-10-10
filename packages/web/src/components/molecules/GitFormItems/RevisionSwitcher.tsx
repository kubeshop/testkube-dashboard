import {Segmented} from 'antd';

type RevisionSwitcherProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
};

const RevisionSwitcher: React.FC<RevisionSwitcherProps> = props => {
  const {value, onChange, disabled} = props;

  return (
    <Segmented
      options={[
        {label: 'BRANCH', value: 'branch'},
        {label: 'COMMIT', value: 'commit'},
      ]}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default RevisionSwitcher;
