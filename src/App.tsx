import React, { useState } from "react";
import Table, { TableColumn } from "./components/Table";

function App() {
  const [tableData, setTableData] = useState<SampleTableData[]>(
    generateRandomTableData()
  );

  return (
    <div className="App">
      <Table
        data={tableData}
        columns={columns}
        option={{
          defaultNumberFormatter: (n) => n.toFixed(4),
        }}
      />
    </div>
  );
}
type SampleTableData = {
  field1: number;
  field2: string;
};

const columns: TableColumn<SampleTableData>[] = [
  {
    accessor: "field1",
    header: "Field1",
  },
  {
    accessor: (row) => row.field1.toFixed(2).toString(),
    header: "Field1 fixed(2)",
  },
  {
    accessor: "field2",
    header: () => (
      <>
        field2<strong style={{ color: "blue" }}>*ComponentType</strong>
      </>
    ),
  },
];

function generateRandomTableData(): any {
  const result: SampleTableData[] = [];
  for (let i = 0; i < 20; i++) {
    result.push({
      field1: Math.random(),
      field2: Math.random().toString(),
    });
  }
  return result;
}
export default App;
