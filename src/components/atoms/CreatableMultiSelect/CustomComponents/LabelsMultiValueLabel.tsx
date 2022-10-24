import {MultiValueGenericProps} from 'react-select';

import {Option} from '@models/form';

import {Text} from '@custom-antd';

import {StyledMultiLabel} from '../CreatableMultiSelect.styled';
import {SplittedLabel} from '../utils';

const LabelsMultiValueLabel = (props: MultiValueGenericProps<Option>) => {
  const {children} = props;

  const renderChildren = () => {
    if (typeof children !== 'string') {
      return null;
    }

    const trimmedChildren = children.trim();

    if (trimmedChildren.match(/(.+:.+)/g)) {
      return <SplittedLabel value={trimmedChildren} textClassName="regular small" />;
    }

    if (trimmedChildren.slice(-1) === ':') {
      return <Text className="regular small">{trimmedChildren.slice(0, -1)}</Text>;
    }

    return <Text className="regular small">{trimmedChildren}</Text>;
  };

  return <StyledMultiLabel data-test={`selected-label-${children}`}>{renderChildren()}</StyledMultiLabel>;
};

export default LabelsMultiValueLabel;
