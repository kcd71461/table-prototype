import React, { useState } from "react";

export type TableColumn<T> = {
  header: string | React.ComponentType;
  accessor?: keyof T | ((row: T) => string | number);
  renderer?: React.ComponentType<{ row: T }>;
};

export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  option?: TableOption;
};

export type TableOption = {
  defaultNumberFormatter?: (number: number) => string;
};

export default function Table<T>({
  data: dataProps,
  columns,
  option,
}: TableProps<T>) {
  const [data, setData] = useState([...dataProps]);

  return (
    <table>
      <thead>
        {columns.map((column, columnIndex) => (
          <th key={columnIndex}>
            {typeof column.header === "string" ? (
              column.header
            ) : (
              <column.header />
            )}
          </th>
        ))}
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => {
                return (
                  <td>
                    <Cell
                      row={row}
                      column={column}
                      option={option}
                      key={columnIndex}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Cell<T>({
  column,
  row,
  option,
}: {
  column: TableColumn<T>;
  row: T;
  option?: TableOption;
}) {
  if (column.renderer) {
    return <column.renderer row={row} />;
  }

  if (column.accessor) {
    const value =
      typeof column.accessor === "function"
        ? column.accessor(row)
        : row[column.accessor];
    if (typeof value === "number" && option?.defaultNumberFormatter) {
      return <>{option.defaultNumberFormatter(value)}</>;
    }
    return <>{value}</>;
  }

  return null;
}
