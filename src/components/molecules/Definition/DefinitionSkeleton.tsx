import {Skeleton} from '@custom-antd';

type DefinitionSkeletonProps = {
  lineHeight: number;
};

const DefinitionSkeleton: React.FC<DefinitionSkeletonProps> = props => {
  const {lineHeight} = props;
  return (
    <>
      <Skeleton additionalStyles={{lineHeight}} paragraph={{rows: 1, width: 400}} />
      <Skeleton additionalStyles={{lineHeight}} paragraph={{rows: 1, width: 200}} />
      <Skeleton additionalStyles={{lineHeight}} paragraph={{rows: 1, width: 200}} />
      <Skeleton additionalStyles={{lineHeight}} paragraph={{rows: 1, width: 500}} />
      <Skeleton additionalStyles={{lineHeight}} />
      <Skeleton additionalStyles={{lineHeight}} />
      <Skeleton additionalStyles={{lineHeight}} />
    </>
  );
};

export default DefinitionSkeleton;
