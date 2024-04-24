import React, { ReactNode } from 'react';

const TableCell = ({ children, className }: { children: ReactNode; className: string }) => (
  <td className={className}>
    <div className="whitespace-nowrap">{children}</div>
  </td>
);

export default TableCell;