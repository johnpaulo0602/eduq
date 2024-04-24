import React, { ReactNode } from 'react';

const TableHead = ({ children }: { children: ReactNode }) => (
  <thead>
    <tr>{children}</tr>
  </thead>
);

export default TableHead;