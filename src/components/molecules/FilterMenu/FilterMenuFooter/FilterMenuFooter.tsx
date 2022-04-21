import {StyledOkButton, StyledSecondaryButton, StyledSpace} from './FilterMenuFooter.styled';

type FilterMenuFooterProps = {
  onReset: () => void;
  onOk: () => void;
  onCancel?: () => void;
};

const FilterMenuFooter: React.FC<FilterMenuFooterProps> = props => {
  const {onReset, onOk, onCancel} = props;
  return (
    <StyledSpace align="center">
      {onCancel ? <StyledSecondaryButton onClick={onCancel}>Cancel</StyledSecondaryButton> : null}
      <StyledSecondaryButton onClick={onReset}>Reset</StyledSecondaryButton>
      <StyledOkButton onClick={onOk}>Ok</StyledOkButton>
    </StyledSpace>
  );
};

export default FilterMenuFooter;
