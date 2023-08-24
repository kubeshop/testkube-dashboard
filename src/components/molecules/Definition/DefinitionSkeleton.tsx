import {lineHeight} from '@atoms/MonacoEditor';

import {Skeleton} from '@custom-antd/Skeleton';

export const DefinitionSkeleton = () => {
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
