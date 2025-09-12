"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

interface Column {
  dataField: string;
  text: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
}

const CustomTable = ({
  columns,
  data,
  canEdit,
  canDelete,
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
            {canEdit ||
              (canDelete && (
                <th className="py-3 px-6 text-center border-b">Actions</th>
              ))}
          </tr>
        </thead>

        <tbody className="text-gray-700 text-sm">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors "
              >
                {columns.map((col) => (
                  <td
                    key={col.dataField}
                    className="py-3 px-6 border-b"
                    title={String(row[col.dataField] ?? "")}
                  >
                    {col.dataField === "userId"
                      ? String(row[col.dataField]).slice(0, 8) + "..."
                      : row[col.dataField]}
                  </td>
                ))}

                <td className="py-3 px-6 border-b flex justify-center gap-2">
                  {/* Edit Button */}
                  {canEdit && (
                    <button
                      className={`p-2 rounded-full transition cursor-pointer ${
                        row._canEditDelete
                          ? "bg-[#154D71] hover:bg-[#1c6ea4] text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      title={row._canEditDelete ? "Edit" : "Cannot edit"}
                      onClick={() =>
                        row._canEditDelete && onEdit && onEdit(row)
                      }
                      disabled={!row._canEditDelete}
                    >
                      <Icon icon="material-symbols:edit" width={15} />
                    </button>
                  )}

                  {/* Delete Button */}
                  {canDelete && (
                    <button
                      className={`p-2 rounded-full transition cursor-pointer ${
                        row._canEditDelete
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      title={
                        row._canEditDelete ? "Delete" : "Cannot delete"
                      }
                      onClick={() =>
                        row._canEditDelete && onDelete && onDelete(row)
                      }
                      disabled={!row._canEditDelete}
                    >
                      <Icon icon="material-symbols:delete" width={15} />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (canEdit && canDelete ? 1 : 0)}
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
