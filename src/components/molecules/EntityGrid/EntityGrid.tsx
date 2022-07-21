import {useMemo} from 'react';

import {StyledEntityGrid} from './EntityGrid.styled';
import EntityGridItem from './EntityGridItem';

const EntityGrid: React.FC<any> = props => {
  const {data, onNavigateToDetails} = props;

  const renderedGrid = useMemo(() => {
    return data.map((item: any) => {
      return (
        <EntityGridItem
          item={item}
          onClick={() => {
            onNavigateToDetails(item);
          }}
        />
      );
    });
  }, [data]);

  return <StyledEntityGrid>{renderedGrid}</StyledEntityGrid>;
};

export default EntityGrid;
