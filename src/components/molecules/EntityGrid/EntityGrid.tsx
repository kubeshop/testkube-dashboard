import {useMemo} from 'react';

import {StatusIcon} from '@src/components/atoms';

import {StyledEntityGrid, StyledEntityGridItem} from './EntityGrid.styled';

const EntityGridItem: React.FC<any> = props => {
  const {item} = props;

  return (
    <StyledEntityGridItem>
      <StatusIcon status="failed" />
    </StyledEntityGridItem>
  );
};

const EntityGrid: React.FC<any> = props => {
  const {data} = props;

  const renderedGrid = useMemo(() => {
    return data.map((item: any) => {
      return <EntityGridItem item={item} />;
    });
  }, [data]);

  return <StyledEntityGrid>{renderedGrid}</StyledEntityGrid>;
};

export default EntityGrid;
