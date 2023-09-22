window.onload = function() {
  if (typeof window.FileReader !== 'function') {
      alert(`File API isn't supported on this browser yet.`);
  }
}

let resultArray = [];

function readFiles(files) {
  const ol = document.querySelector('#filesList ol');

  for (let i = 0; i < files.length; i++) {
      const name = files[i].name;
      const reader = new FileReader();

      reader.onload = function(e) {
          const data = e.target.result;
          const workbook = XLSX.read(data, {
              type: 'binary'
          });
          workbook.SheetNames.forEach(function(sheetName) {
              const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
              if (sheetName === 'Summary') {
                  fileDate = XL_row_object[1]['GiW Experiments view'].split('-').pop();
              }
              if (sheetName === 'Dataset1') {
                  fileData = XL_row_object[0];
              }
          })
          resultObj = Object.assign({
              date: fileDate
          }, fileData);
          resultArray.push(resultObj);
          const li = document.createElement('li');
          li.textContent = name;
          ol.appendChild(li);
      }
      reader.readAsBinaryString(files[i]);
  }
}

function convertToCSV(args) {
  let result = '',
      counter,
      keys,
      columnDelimiter,
      lineDelimiter,
      data;

  data = args.data || null;
  if (data == null || !data.length) return null;

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
      counter = 0;
      keys.forEach(function(key) {
          if (counter > 0) result += columnDelimiter;

          result += item[key];
          counter++;
      });
      result += lineDelimiter;
  });
  return result;
}

function downloadCSV(args) {
  const resultArraySorted = resultArray.sort(function(a, b) {
      return a.date - b.date;
  });
  let data,
      filename,
      link,
      csv = convertToCSV({
          data: resultArraySorted
      });
  if (csv == null) return;

  filename = args.filename || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}
