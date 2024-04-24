import React, { ReactNode } from 'react';

const Table = ({ children }: { children: ReactNode }) => (
  <div className="table-responsive mb-5">
    <table>{children}</table>
  </div>
);

export default Table;