import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Checkbox, Dropdown, Menu, Space} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {FilterProps} from '@models/filters';
import {Tag} from '@models/tags';

import {useAppSelector} from '@redux/hooks';
import {selectTags} from '@redux/reducers/tagsSlice';

import AppliedTags from './AppliedTags';
import {StyledTagsFilterMenu} from './TagsFilter.styled';

const TagsFilter: React.FC<FilterProps> = props => {
  const {setFilters, filters} = props;

  const dispatch = useDispatch();

  const tags: Tag[] = useAppSelector(selectTags);

  const defaultTags = useMemo(() => (filters && filters.tags) || [], [filters]);

  const [isVisible, setVisibilityState] = useState(false);
  const [tagsMapping, setTagsMapping] = useState<Tag[]>(defaultTags);

  const onVisibleChange = (flag: boolean) => {
    setVisibilityState(flag);
  };

  const onMenuClick = () => {};

  const onTagChange = (tag: Tag) => {
    if (tagsMapping.includes(tag)) {
      return setTagsMapping(
        tagsMapping.filter(currentTag => {
          return tag !== currentTag;
        })
      );
    }

    setTagsMapping([...tagsMapping, tag]);
  };

  const renderedTags = useMemo(() => {
    if (!tags || !tags.length) {
      return null;
    }

    return tags.map(tag => {
      return (
        <Menu.Item key={tag}>
          <Checkbox
            checked={filters.tags.includes(tag)}
            onChange={() => {
              return onTagChange(tag);
            }}
          >
            {tag}
          </Checkbox>
        </Menu.Item>
      );
    });
  }, [tags, filters, tagsMapping, defaultTags]);

  const appliedTags: Tag[] | null = useMemo(() => {
    if (!tags || !tags.length) {
      return null;
    }

    return tags
      .map((tag: Tag) => {
        return filters.tags.includes(tag) ? tag : '';
      })
      .filter(tag => tag);
  }, [tags, filters, tagsMapping, defaultTags]);

  useEffect(() => {
    dispatch(setFilters({...filters, tags: tagsMapping}));
  }, [tagsMapping]);

  useEffect(() => {
    setTagsMapping(defaultTags);
  }, [defaultTags]);

  const menu = <StyledTagsFilterMenu onClick={onMenuClick}>{renderedTags}</StyledTagsFilterMenu>;

  return (
    <Space size={20}>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="bottomCenter"
        onVisibleChange={onVisibleChange}
        visible={isVisible}
      >
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Tag <DownOutlined />
        </a>
      </Dropdown>
      {appliedTags && appliedTags.length ? <AppliedTags appliedTags={appliedTags} onTagChange={onTagChange} /> : null}
    </Space>
  );
};

export default TagsFilter;
