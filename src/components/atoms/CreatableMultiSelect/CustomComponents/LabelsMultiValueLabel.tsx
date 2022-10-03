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

    if (children.match(/(.+:.+)/g)) {
      return <SplittedLabel value={children} textClassName="regular small" />;
    }

    if (children.slice(-1) === ':') {
      return <Text className="regular small">{children.slice(0, -1)}</Text>;
    }

    return <Text className="regular small">{children}</Text>;
  };

  return <StyledMultiLabel>{renderChildren()}</StyledMultiLabel>;
};

export default LabelsMultiValueLabel;
