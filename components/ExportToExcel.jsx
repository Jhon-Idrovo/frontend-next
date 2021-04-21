//https://dev.to/jasurkurbanovinit/how-to-export-data-to-excel-from-api-using-react-25go

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportToExcel = (apiData, fileName) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    console.log(apiData, fileName);
    //create a worksheet object with the data
    const ws = XLSX.utils.json_to_sheet(apiData);
    //create an empty workbook
    const wb = XLSX.utils.book_new();
    //append the ws to the wb
    XLSX.utils.book_append_sheet(wb, ws, "Gastos");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    //dowloading, this can be done in short with the writeFile method
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  exportToCSV();
};

export default ExportToExcel;
