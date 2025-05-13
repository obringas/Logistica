"use client";
import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

export interface IRowButton {
  icon?: string;
  color: string;
  label?: string;
  className?: string;
  action: (index: number) => void;
}

export interface IHeaderItem {
  label: string;
  key: string;
  type: "numeric" | "text" | "date" | "currency" | "buttons";
  align?: "left" | "right" | "center";
  buttons?: IRowButton[];
}

interface DataTableProps {
  columns: IHeaderItem[];
  data: any[];
  loading?: boolean;
  multipleSelection?: boolean;
  onRowClick?: (rowData: any) => void;
  onSelectionChange?: (selectedRows: any[]) => void;
}

export default function DataTable({
  columns,
  data,
  loading = false,
  multipleSelection = false,
  onRowClick,
  onSelectionChange,
}: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }
  }, [selectedRows, onSelectionChange]);

  const tableColumns: ColumnDef<any>[] = columns.map((col) => ({
    accessorKey: col.key,
    header: () => <span className="font-bold">{col.label}</span>,
    cell: (info) => {
      const value = info.getValue();

      if (col.type === "numeric") {
        return <span className="text-right">{Number(value).toLocaleString()}</span>;
      }
      if (col.type === "date") {
        const dateValue = value instanceof Date ? value : new Date(String(value));
        return <span>{!isNaN(dateValue.getTime()) ? dateValue.toLocaleDateString() : "Fecha inválida"}</span>;
      }
      if (col.type === "currency") {
        return <span className="text-right">${Number(value).toFixed(2)}</span>;
      }
      if (col.type === "buttons" && col.buttons) {
        return (
          <div className="flex gap-2">
            {col.buttons.map((btn, index) => (
              <button
                key={index}
                className={`p-1 px-3 rounded text-white ${btn.color}`}
                onClick={() => btn.action(info.row.index)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        );
      }
      return <span>{typeof value === "string" || typeof value === "number" ? value : JSON.stringify(value)}</span>;
    },
  }));

  const table = useReactTable({
    columns: tableColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      {loading ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {multipleSelection && <th className="p-2 border"></th>}
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-2 border">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`cursor-pointer hover:bg-gray-100 ${
                    selectedRows.includes(row.original) ? "bg-blue-200" : ""
                  }`}
                  onClick={() => {
                    if (onRowClick) onRowClick(row.original);
                    if (multipleSelection) {
                      setSelectedRows((prev) =>
                        prev.includes(row.original)
                          ? prev.filter((item) => item !== row.original)
                          : [...prev, row.original]
                      );
                    } else {
                      setSelectedRows([row.original]);
                    }
                  }}
                >
                  {multipleSelection && (
                    <td className="p-2 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.original)}
                        onChange={() => {}}
                      />
                    </td>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 border">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginación */}
      <div className="mt-2 flex justify-between">
        <button
          className="p-2 bg-gray-300 rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>
        <span>Página {table.getState().pagination.pageIndex + 1}</span>
        <button
          className="p-2 bg-gray-300 rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
