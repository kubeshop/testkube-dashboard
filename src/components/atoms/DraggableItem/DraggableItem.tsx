import React, {useEffect, useRef, useState} from 'react';

import {motion, useMotionValue} from 'framer-motion';

import Colors from '@styles/Colors';

const onTop = {zIndex: 1};
const flat = {
  zIndex: 0,
  transition: {delay: 0.3},
};

type DraggableItemProps = {
  setPosition: (i: any, config: any) => any;
  moveItem: (i: any, pos: any) => any;
  i: any;
  children: React.ReactNode;
};

const DraggableItem: React.FC<DraggableItemProps> = props => {
  const {setPosition, moveItem, i, children} = props;
  const [isDragging, setDragging] = useState(false);

  const ref = useRef(null);

  const dragOriginY = useMotionValue(0);

  useEffect(() => {
    setPosition(i, {
      // @ts-ignore
      height: ref?.current?.offsetHeight,
      // @ts-ignore
      top: ref?.current?.offsetTop,
    });
  });

  return (
    <motion.li
      ref={ref}
      initial={false}
      animate={isDragging ? onTop : flat}
      style={{background: 'transparent', height: '60px'}}
      whileHover={{background: Colors.slate900}}
      whileTap={{scale: 1.12}}
      drag="y"
      // @ts-ignore
      dragOriginY={dragOriginY}
      dragConstraints={{top: 0, bottom: 0}}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, {point}) => moveItem(i, point.y)}
      positionTransition={({delta}: {delta: any}) => {
        if (isDragging) {
          dragOriginY.set(dragOriginY.get() + delta.y);
        }
        return !isDragging;
      }}
    >
      {children}
    </motion.li>
  );
};

export default DraggableItem;
