import {StyledOkButton, StyledResetButton, StyledSpace} from './FilterMenuFooter.styled';

type Props = {
  onReset: () => void;
  onOk: () => void;
};

const FilterMenuFooter: React.FC<Props> = ({onReset, onOk}) => {
  return (
    <StyledSpace align="center">
      <StyledResetButton onClick={onReset}>Reset</StyledResetButton>
      <StyledOkButton onClick={onOk}>Ok</StyledOkButton>
    </StyledSpace>
  );
};

export default FilterMenuFooter;
