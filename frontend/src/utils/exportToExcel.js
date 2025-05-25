import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Downloads JSON data as an Excel file.
 * @param {Array} data - The data to export
 * @param {String} filename - The name of the Excel file
 * @param {Object} columnMap - Optional: mapping of field names to column headers
 */
export const exportToExcel = (data, filename, columnMap = null) => {
  if (!data || data.length === 0) return;

  let exportData = data;

  if (columnMap) {
    // Map keys to user-friendly headers
    exportData = data.map(item => {
      const mapped = {};
      Object.entries(columnMap).forEach(([key, label]) => {
        mapped[label] = item[key] ?? "N/A";
      });
      return mapped;
    });
  }

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(dataBlob, `${filename}.xlsx`);
};
