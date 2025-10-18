"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

interface Column {
  dataField: string;
  text: string;
  formatter?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
  checkCanEdit?: (row: Record<string, any>) => boolean;
  checkCanDelete?: (row: Record<string, any>) => boolean;
  emptyMessage?: string;
}

const CustomTable = ({
  columns,
  data,
  canEdit = false,
  canDelete = false,
  onEdit,
  onDelete,
  checkCanEdit,
  checkCanDelete,
  emptyMessage = "No data available",
}: TableProps) => {
  const showActions = canEdit || canDelete;

  const isEditAllowed = (row: any) => {
    if (!canEdit) return false;
    return checkCanEdit ? checkCanEdit(row) : true;
  };

  const isDeleteAllowed = (row: any) => {
    if (!canDelete) return false;
    return checkCanDelete ? checkCanDelete(row) : true;
  };

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
            data.map((row, rowIndex) => {
              const canEditRow = isEditAllowed(row);
              const canDeleteRow = isDeleteAllowed(row);

              return (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.dataField}
                      className="py-3 px-6 border-b"
                      title={String(row[col.dataField] ?? "")}
                    >
                      {col.formatter
                        ? col.formatter(row[col.dataField], row)
                        : row[col.dataField]}
                    </td>
                  ))}

                  {showActions && (
                    <td className="py-3 px-6 border-b">
                      <div className="flex justify-center gap-2">
                        {/* Edit Button */}
                        {canEdit && (
                          <button
                            className={`p-2 rounded-full transition cursor-pointer ${
                              canEditRow
                                ? "bg-[#154D71] hover:bg-[#1c6ea4] text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            title={canEditRow ? "Edit" : "Cannot edit"}
                            onClick={() => canEditRow && onEdit && onEdit(row)}
                            disabled={!canEditRow}
                          >
                            <Icon icon="material-symbols:edit" width={15} />
                          </button>
                        )}

                        {/* Delete Button */}
                        {canDelete && (
                          <button
                            className={`p-2 rounded-full transition cursor-pointer ${
                              canDeleteRow
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            title={canDeleteRow ? "Delete" : "Cannot delete"}
                            onClick={() =>
                              canDeleteRow && onDelete && onDelete(row)
                            }
                            disabled={!canDeleteRow}
                          >
                            <Icon icon="material-symbols:delete" width={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="text-center py-4 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;