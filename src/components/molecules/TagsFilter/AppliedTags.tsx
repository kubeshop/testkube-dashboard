import {useMemo} from 'react';

import {Space} from 'antd';

import {Tag} from '@models/tags';

import {StyledAppliedTag, StyledAppliedTagContainer, StyledCloseIcon} from './TagsFilter.styled';

type AppliedTagsProps = {
  appliedTags: Tag[];
  onTagChange: (tag: Tag) => void;
};

type AppliedTagProps = {
  tag: Tag;
};

const AppliedTag: React.FC<Pick<AppliedTagsProps, 'onTagChange'> & AppliedTagProps> = props => {
  const {tag, onTagChange} = props;

  return (
    <StyledAppliedTagContainer
      onClick={() => {
        onTagChange(tag);
      }}
    >
      <StyledAppliedTag>{tag}</StyledAppliedTag>
      <StyledCloseIcon />
    </StyledAppliedTagContainer>
  );
};

const AppliedTags: React.FC<AppliedTagsProps> = props => {
  const {appliedTags, onTagChange} = props;

  const renderedAppliedTags = useMemo(() => {
    return appliedTags.map(appliedTag => {
      return <AppliedTag tag={appliedTag} onTagChange={onTagChange} />;
    });
  }, [appliedTags]);

  return <Space size={10}>{renderedAppliedTags}</Space>;
};

export default AppliedTags;
