import React, {PropsWithChildren, memo} from 'react';
import {DragDropContext, Draggable, DropResult, DroppableProvided, DroppableStateSnapshot} from 'react-beautiful-dnd';

import {LocalStepsList} from '@models/testSuite';

import {reorder} from '@utils/array';

import StrictModeDroppable from './StrictModeDroppable';

interface ItemComponentProps {
  index: number;
  isDragging: boolean;
  onDelete: (index: number) => void;
  disabled: boolean;
}

type DragNDropListProps = {
  items: LocalStepsList;
  setItems: (steps: LocalStepsList) => void;
  ContainerComponent: React.FC<
    PropsWithChildren<{
      isDragging: DroppableStateSnapshot['isDraggingOver'];
      ref: DroppableProvided['innerRef'];
    }>
  >;
  ItemComponent: React.FC<ItemComponentProps>;
  onDelete: (index: number) => void;
  scrollRef: React.RefObject<HTMLDivElement> | undefined;
  disabled?: boolean;
};

const DragNDropList: React.FC<DragNDropListProps> = props => {
  const {items = [], setItems, onDelete, scrollRef, ItemComponent, ContainerComponent, disabled = false} = props;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    const reorderedItems = reorder(items, result.source.index, result.destination.index);

    setItems(reorderedItems);
  };

  const onDragStart = () => {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <StrictModeDroppable droppableId="droppable" isDropDisabled={disabled}>
        {(provided, snapshot) => (
          <ContainerComponent {...provided.droppableProps} ref={provided.innerRef} isDragging={snapshot.isDraggingOver}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={String(item.id)} index={index} isDragDisabled={disabled}>
                {(providedDraggable, snapshotDraggable) => (
                  <div
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    {...providedDraggable.dragHandleProps}
                  >
                    <ItemComponent
                      {...item}
                      index={index}
                      isDragging={snapshotDraggable.isDragging}
                      onDelete={onDelete}
                      disabled={disabled}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            <>
              <div ref={scrollRef} />
              {provided.placeholder}
            </>
          </ContainerComponent>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default memo(DragNDropList);
