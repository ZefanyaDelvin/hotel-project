"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

interface Column {
  dataField: string;
  text: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  showActions?: boolean;
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
}

const CustomTable = ({
  columns,
  data,
  showActions,
  onEdit,
  onDelete,
}: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-[#154D71] text-white text-sm">
          <tr>
            {columns.map((col) => (
              <th key={col.dataField} className="py-3 px-6 text-left border-b">
                {col.text}
              </th>
            ))}
            {showActions && (
              <th className="py-3 px-6 text-center border-b">Actions</th>
            )}
          </tr>
        </thead>

        <tbody className="text-gray-700 text-sm">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.dataField} className="py-3 px-6 border-b">
                    {row[col.dataField]}
                  </td>
                ))}

                {showActions && (
                  <td className="py-3 px-6 border-b flex justify-center gap-2">
                    <button
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition cursor-pointer"
                      title="Edit"
                      onClick={() => onEdit && onEdit(row)}
                    >
                      <Icon icon="material-symbols:edit" width={15} />
                    </button>
                    <button
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition cursor-pointer"
                      title="Delete"
                      onClick={() => onDelete && onDelete(row)}
                    >
                      <Icon icon="material-symbols:delete" width={15} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
