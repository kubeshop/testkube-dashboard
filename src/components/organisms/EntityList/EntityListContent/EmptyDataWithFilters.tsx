import {FC, useContext} from 'react';

import {Space} from 'antd';

import styled from 'styled-components';

import {ReactComponent as EmptySearch} from '@assets/empty-search.svg';

import {MainContext} from '@contexts/MainContext';

import {Button} from '@custom-antd/Button';
import {Text} from '@custom-antd/Typography/Text';
import {Title} from '@custom-antd/Typography/Title';

import {StyledButtonContainer} from '@organisms/EntityList/EntityListContent.styled';

import {Colors} from '@styles/Colors';

const StyledEmptyTestsDataContainer = styled(Space)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyDataWithFilters: FC<any> = props => {
  const {resetFilters} = props;

  const {isClusterAvailable} = useContext(MainContext);

  return (
    <StyledEmptyTestsDataContainer size={30} direction="vertical">
      <EmptySearch />
      <Title className="text-center">No results found</Title>
      <Text className="regular middle text-center" color={Colors.slate400}>
        We couldn’t find any results for your filters.
      </Text>
      <StyledButtonContainer>
        <Button type="primary" onClick={() => resetFilters()} disabled={!isClusterAvailable}>
          Reset all filters
        </Button>
      </StyledButtonContainer>
    </StyledEmptyTestsDataContainer>
  );
};
