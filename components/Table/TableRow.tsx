import React, { ReactNode } from 'react';

const TableRow = ({ children, key }: { children: ReactNode; key: string }) => <tr key={key}>{children}</tr>;

export default TableRow;

