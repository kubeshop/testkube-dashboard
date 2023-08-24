import {FC} from 'react';

import {Permissions, usePermission} from '@permissions/base';

import {TableRowPure} from './TableRow/TableRowPure';

export const TableRow: FC<{data: any; onAbortExecution: any}> = props => {
  const mayManageExecution = usePermission(Permissions.manageEntityExecution);
  return <TableRowPure {...props} mayManageExecution={mayManageExecution} />;
};
