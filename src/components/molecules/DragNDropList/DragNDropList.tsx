import {useRef} from 'react';

import move from 'array-move';

import {DraggableItem} from '@atoms';

import {Position, findIndex} from '@utils/findIndexDraggable';

type DragNDropListProps = {
  items: any[];
  setItems: (items: any[]) => void;
};

const DragNDropList: React.FC<DragNDropListProps> = props => {
  const {items, setItems} = props;
  const positions = useRef<Position[]>([]).current;

  const setPosition = (i: number, offset: Position) => {
    positions[i] = offset;
  };

  const moveItem = (i: number, dragOffset: number) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setItems(move(items, i, targetIndex));
  };
  return (
    <ul>
      {items.map((item, i) => (
        <DraggableItem key={item} i={i} setPosition={setPosition} moveItem={moveItem}>
          {item}
        </DraggableItem>
      ))}
    </ul>
  );
};

export default DragNDropList;
