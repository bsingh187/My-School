import { deleteIcon, editIcon } from "assets";
import React from "react";
import { Table, Spinner } from "react-bootstrap";

interface TableColumn {
  header: string;
  key: string;
  width?: string;
}

interface TableRow {
  [key: string]: any;
}

interface CustomTableProps {
  columns: TableColumn[];
  data: TableRow[];
  loading: boolean;
  onEdit?: (id: string, row: TableRow) => void;
  onDelete?: (id: string) => void;
  emptyMessage?: string;
}

const CustomTableComponent: React.FC<CustomTableProps> = ({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  emptyMessage = "No data found",
}) => {
  return (
    <div className="responsive-table">
      {loading ? (
        <div className="loader d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              {columns?.map((col, index) => (
                <th key={index} style={{ width: col.width || "auto" }}>
                  {col.header}
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns?.map((col, colIndex) => (
                    <td key={colIndex}>{row[col.key] || "N/A"}</td>
                  ))}
                  <td>
                    <div className="flex gap-2">
                      {onEdit && (
                        <button
                          title="Edit"
                          style={{ border: "none" }}
                          onClick={() => onEdit(row?.id, row)}
                        >
                          <img
                            src={editIcon}
                            alt="edit-icon"
                            className="cursor-pointer"
                          />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          title="Delete"
                          style={{ border: "none" }}
                          onClick={() => onDelete(row?.id)}  
                        >
                          <img
                            src={deleteIcon}
                            alt="delete-icon"
                            className="cursor-pointer"
                          />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CustomTableComponent;
