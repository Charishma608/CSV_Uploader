import { useState } from "react";
import Papa from "papaparse";



export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length > 0) {
          setHeaders(Object.keys(results.data[0]));
          setTableData(results.data);
        }
      },
    });
  };

  return (
    <main>
  <div className="container">
    <h1>CSV Viewer</h1>
    <p>Upload your CSV file to view its contents in a clean table format.</p>

    <label className="upload-label">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      Upload CSV File
    </label>

    {tableData.length > 0 && (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {headers.map((header, colIdx) => (
                  <td key={colIdx}>{row[header] || "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</main>

  );
}
