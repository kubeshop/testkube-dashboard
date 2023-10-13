import {AntdCustomStyledAutoComplete, ICustomAutoCompleteProps} from './AutoComplete.styled';

const AutoComplete: React.FC<ICustomAutoCompleteProps> = props => {
  return <AntdCustomStyledAutoComplete {...props} />;
};

export default AutoComplete;
