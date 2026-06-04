import React from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../../store/slices/uiSlice';
import { FaCopy, FaFileCsv, FaFileExcel, FaFilePdf, FaPrint } from 'react-icons/fa';

const ExportButtons = ({ headers, rows, fileNamePrefix = 'report', sheetName = 'Report' }) => {
  const dispatch = useDispatch();

  const handleExport = (type) => {
    if (!headers || !rows) return;

    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const dateStr = `${day}_${month}_${year}`;
    const fileName = `${fileNamePrefix}_${dateStr}`;

    if (type === 'copy') {
      const tsvContent = [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
      navigator.clipboard.writeText(tsvContent)
        .then(() => dispatch(setNotification({ type: 'success', message: 'Table data copied to clipboard as TSV!' })))
        .catch(err => dispatch(setNotification({ type: 'error', message: 'Failed to copy: ' + err })));
    } else if (type === 'csv') {
      const csvContent = [
        headers.join(','),
        ...rows.map(row => 
          row.map(val => {
            const stringVal = String(val);
            if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
              return `"${stringVal.replace(/"/g, '""')}"`;
            }
            return stringVal;
          }).join(',')
        )
      ].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.csv`;
      link.click();
      dispatch(setNotification({ type: 'success', message: 'CSV downloaded successfully!' }));
    } else if (type === 'excel') {
      let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
      html += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${sheetName}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta charset="utf-8"></head><body>`;
      html += `<table border="1">`;
      html += `<tr style="background-color: #0D1B5E; color: #FFFFFF; font-weight: bold;">`;
      headers.forEach(h => {
        html += `<th>${h}</th>`;
      });
      html += `</tr>`;
      rows.forEach(row => {
        html += `<tr>`;
        row.forEach(val => {
          html += `<td>${val}</td>`;
        });
        html += `</tr>`;
      });
      html += `</table></body></html>`;

      const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.xls`;
      link.click();
      dispatch(setNotification({ type: 'success', message: 'Excel downloaded successfully!' }));
    } else if (type === 'print' || type === 'pdf') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        let rowsHtml = '';
        rows.forEach(row => {
          rowsHtml += '<tr>';
          row.forEach((val, colIdx) => {
            const stringVal = String(val);
            const lowerVal = stringVal.toLowerCase();
            let tdStyle = '';
            let contentHtml = stringVal;

            if (lowerVal === 'active' || lowerVal === 'inactive' || lowerVal === 'true' || lowerVal === 'false') {
              const isActive = lowerVal === 'active' || lowerVal === 'true';
              tdStyle = `color: ${isActive ? '#27AE60' : '#E53E3E'}; font-weight: bold;`;
              contentHtml = isActive ? 'ACTIVE' : 'INACTIVE';
            } else if (colIdx === 1) {
              tdStyle = 'font-weight: 600; color: #1756AA;';
            } else if (stringVal.startsWith('₹') || (headers[colIdx] && headers[colIdx].toLowerCase().includes('price') && !isNaN(val))) {
              tdStyle = 'color: #27AE60; font-weight: bold;';
              if (!stringVal.startsWith('₹')) {
                contentHtml = '₹' + stringVal;
              }
            } else if (colIdx === 2 && stringVal.length > 0 && stringVal.length < 15) {
              contentHtml = `<span style="background: rgba(23, 86, 170, 0.1); color: #1756AA; padding: 2px 6px; border-radius: 4px;">${stringVal}</span>`;
            }

            rowsHtml += `<td style="${tdStyle}">${contentHtml}</td>`;
          });
          rowsHtml += '</tr>';
        });

        printWindow.document.write(`
          <html>
            <head>
              <title>${fileName}</title>
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  margin: 20px;
                  color: #333;
                }
                h2 {
                  color: #0D1B5E;
                  margin-bottom: 20px;
                  border-bottom: 2px solid #0D1B5E;
                  padding-bottom: 8px;
                  text-transform: capitalize;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 10px;
                }
                th, td {
                  border: 1px solid #E2E8F0;
                  padding: 10px 12px;
                  text-align: left;
                  font-size: 14px;
                }
                th {
                  background-color: #0D1B5E;
                  color: white;
                  font-weight: bold;
                }
                tr:nth-child(even) {
                  background-color: #F8FAFC;
                }
                @media print {
                  body { margin: 0; }
                  h2 { font-size: 20px; }
                  th { background-color: #0D1B5E !important; color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
              </style>
            </head>
            <body>
              <h2>${fileNamePrefix.replace(/_/g, ' ')}</h2>
              <table>
                <thead>
                  <tr>
                    ${headers.map(h => `<th>${h}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>
              <script>
                window.onload = function() {
                  window.print();
                  window.close();
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
        dispatch(setNotification({ type: 'success', message: `${type.toUpperCase()} export opened successfully!` }));
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
      <button className="global-export-btn btn-copy" title="Copy Table" onClick={(e) => { e.stopPropagation(); handleExport('copy'); }}><FaCopy /></button>
      <button className="global-export-btn btn-excel" title="Download Excel" onClick={(e) => { e.stopPropagation(); handleExport('excel'); }}><FaFileExcel /></button>
      <button className="global-export-btn btn-pdf" title="Download PDF" onClick={(e) => { e.stopPropagation(); handleExport('pdf'); }}><FaFilePdf /></button>
      <button className="global-export-btn btn-csv" title="Download CSV" onClick={(e) => { e.stopPropagation(); handleExport('csv'); }}><FaFileCsv /></button>
      <button className="global-export-btn btn-print" title="Print Table" onClick={(e) => { e.stopPropagation(); handleExport('print'); }}><FaPrint /></button>
    </div>
  );
};

export default ExportButtons;
