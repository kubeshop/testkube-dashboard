import {useContext} from 'react';

import {StatusIcon} from '@atoms';

import {Text, Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {EntityExecutionsContext} from '../EntityExecutionsContainer/EntityExecutionsContainer';
import {DetailsWrapper, ItemColumn} from '../EntityExecutionsContent/EntityExecutionsContent.styled';
import {DrawerContent, DrawerHeader, ExecutionDetailsDrawerWrapper, ItemRow} from './ExecutionDetailsDrawer.styled';

const ExecutionDetailsDrawer: React.FC = () => {
  const {isRowSelected, selectedRow, unselectRow} = useContext(EntityExecutionsContext);

  return (
    <ExecutionDetailsDrawerWrapper
      $isRowSelected={isRowSelected}
      onClick={() => {
        unselectRow();
      }}
    >
      {selectedRow ? (
        <>
          <DrawerHeader>
            <StatusIcon status={selectedRow?.status} />
            <DetailsWrapper>
              <ItemRow $flex={1}>
                <ItemColumn>
                  <Title ellipsis>{selectedRow?.name}</Title>
                </ItemColumn>
                <ItemColumn />
              </ItemRow>
              <ItemRow $flex={1}>
                <ItemColumn>
                  <Text className="regular small" color={Colors.slate400}>
                    dsadsa
                  </Text>
                  <Text className="regular small" color={Colors.slate400}>
                    manual
                  </Text>
                </ItemColumn>
              </ItemRow>
            </DetailsWrapper>
          </DrawerHeader>
          <DrawerContent>width</DrawerContent>
        </>
      ) : null}
    </ExecutionDetailsDrawerWrapper>
  );
};

export default ExecutionDetailsDrawer;
