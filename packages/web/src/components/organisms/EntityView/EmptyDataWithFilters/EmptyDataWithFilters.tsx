import {ReactComponent as EmptySearch} from '@assets/empty-search.svg';

import {Button, Text, Title} from '@custom-antd';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import Colors from '@styles/Colors';

import * as S from './EmptyDataWithFilters.styled';

const EmptyDataWithFilters: React.FC<any> = props => {
  const {resetFilters} = props;

  const isClusterAvailable = useSystemAccess(SystemAccess.agent);

  return (
    <S.EmptyTestsDataContainer size={30} direction="vertical">
      <EmptySearch />
      <Title className="text-center">No results found</Title>

      <Text className="regular middle text-center" color={Colors.slate400}>
        We couldn’t find any results for your filters.
      </Text>

      <S.ButtonContainer>
        <Button type="primary" onClick={() => resetFilters()} disabled={!isClusterAvailable}>
          Reset all filters
        </Button>
      </S.ButtonContainer>
    </S.EmptyTestsDataContainer>
  );
};

export default EmptyDataWithFilters;
