import {Button} from '@custom-antd';

import {StyledSpace} from './FilterMenuFooter.styled';

type FilterMenuFooterProps = {
  onReset: () => void;
  onOk: () => void;
  onCancel?: () => void;
};

const FilterMenuFooter: React.FC<FilterMenuFooterProps> = props => {
  const {onReset, onOk, onCancel} = props;
  return (
    <StyledSpace align="center">
      {onCancel ? (
        <Button customType="secondary" onClick={onCancel}>
          Cancel
        </Button>
      ) : null}
      <Button customType="secondary" onClick={onReset}>
        Reset
      </Button>
      <Button customType="primary" onClick={onOk}>
        Ok
      </Button>
    </StyledSpace>
  );
};

export default FilterMenuFooter;
