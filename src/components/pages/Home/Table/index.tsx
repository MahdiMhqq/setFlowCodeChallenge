import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import columns from "./services/columns";

import type { DefinedUseQueryResult } from "@tanstack/react-query";

interface ISetTableProps {
  className?: string;
  queryProps: DefinedUseQueryResult<IGetSetsResponse, unknown>;
}

function SetTable({ className = "", queryProps }: ISetTableProps) {
  //Tanstack Query
  const { data, isSuccess } = queryProps;

  //Tanstack Table
  const table = useReactTable({
    data: isSuccess ? data.items : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "2rem",
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ padding: 0 }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ padding: 0 }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SetTable;
