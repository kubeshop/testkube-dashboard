import {MultiValueGenericProps} from 'react-select';

import {Option} from '@models/form';

import {SplitLabelText} from '@atoms';

import {Text} from '@custom-antd';

import {StyledMultiLabel} from '../CreatableMultiSelect.styled';

const LabelsMultiValueLabel = (props: MultiValueGenericProps<Option>) => {
  const {children} = props;

  const renderChildren = () => {
    if (typeof children !== 'string') {
      return null;
    }

    const trimmedChildren = children.trim();

    if (trimmedChildren.match(/(.+:.+)/g)) {
      return <SplitLabelText value={trimmedChildren} textClassName="regular small" />;
    }

    if (trimmedChildren.slice(-1) === ':') {
      return <Text>{trimmedChildren.slice(0, -1)}</Text>;
    }

    return <Text>{trimmedChildren}</Text>;
  };

  return <StyledMultiLabel data-test={`selected-label-${children}`}>{renderChildren()}</StyledMultiLabel>;
};

export default LabelsMultiValueLabel;
