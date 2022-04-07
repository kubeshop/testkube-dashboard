import {StyledOkButton, StyledResetButton, StyledSpace} from './FilterMenuFooter.styled';

type FilterMenuFooterProps = {
  onReset: () => void;
  onOk: () => void;
};

const FilterMenuFooter: React.FC<FilterMenuFooterProps> = props => {
  const {onReset, onOk} = props;
  return (
    <StyledSpace align="center">
      <StyledResetButton onClick={onReset}>Reset</StyledResetButton>
      <StyledOkButton onClick={onOk}>Ok</StyledOkButton>
    </StyledSpace>
  );
};

export default FilterMenuFooter;
