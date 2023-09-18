import React from 'react';

import {Permissions, usePermission} from '@permissions/base';

import TableRowPure from './TableRowPure';

const TableRow: React.FC<{data: any; onAbortExecution?: any}> = props => {
  const mayManageExecution = usePermission(Permissions.manageEntityExecution);
  return <TableRowPure {...props} mayManageExecution={mayManageExecution} />;
};

export default TableRow;
