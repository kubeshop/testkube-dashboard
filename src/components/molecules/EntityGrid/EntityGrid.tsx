import {useMemo} from 'react';

import {StyledEntityGrid} from './EntityGrid.styled';
import EntityGridItem from './EntityGridItem';

type EntityGridProps = {
  data: any[];
  onNavigateToDetails: any;
};

const EntityGrid: React.FC<EntityGridProps> = props => {
  const {data, onNavigateToDetails} = props;

  const renderedGrid = useMemo(() => {
    return data.map((item: any, index) => {
      const key = `entity_grid_item-${index}`;

      return (
        <EntityGridItem
          key={item.dataItem.name}
          item={item}
          onClick={() => {
            onNavigateToDetails(item);
          }}
          key={key}
        />
      );
    });
  }, [data]);

  return <StyledEntityGrid>{renderedGrid}</StyledEntityGrid>;
};

export default EntityGrid;
