import {FC} from 'react';

import {Button} from '@custom-antd/Button';

import {StyledSpace} from './FilterMenuFooter.styled';

type FilterMenuFooterProps = {
  onReset: () => void;
  onOk: () => void;
  onCancel?: () => void;
};

export const FilterMenuFooter: FC<FilterMenuFooterProps> = props => {
  const {onReset, onOk, onCancel} = props;
  return (
    <StyledSpace>
      {onCancel ? (
        <Button $customType="transparent" onClick={onCancel}>
          Cancel
        </Button>
      ) : null}
      <Button $customType="secondary" onClick={onReset}>
        Reset
      </Button>
      <Button $customType="primary" onClick={onOk}>
        Ok
      </Button>
    </StyledSpace>
  );
};
