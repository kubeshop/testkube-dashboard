import React, {memo} from 'react';
import {DragDropContext, Draggable} from 'react-beautiful-dnd';

import {reorder} from '@utils/array';

import StrictModeDroppable from './StrictModeDroppable';

type DragNDropListProps = {
  items: any[];
  setItems: (items: any[]) => void;
  ContainerComponent: any;
  ItemComponent: any;
  onDelete: (index: number) => void;
  scrollRef: any;
};

const DragNDropList: React.FC<DragNDropListProps> = props => {
  const {items = [], setItems, onDelete, scrollRef, ItemComponent, ContainerComponent} = props;

  const onDragEnd = (result: any) => {
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
      <StrictModeDroppable droppableId="droppable">
        {(provided, snapshot) => (
          <ContainerComponent {...provided.droppableProps} ref={provided.innerRef} isDragging={snapshot.isDraggingOver}>
            {items.map((item: any, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
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
