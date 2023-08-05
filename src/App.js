import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './App.css';

function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [email, setEmail] = useState('');
  const tableRef = useRef(null);

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      complete: (result) => {
        setArray((prevArray) => [...prevArray, ...result.data]);
      },
      header: true,
    });
  };

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

    const newArray = csvRows.map((i) => {
      const values = i.split(',');
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray((prevArray) => [...prevArray, ...newArray]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const headerKeys = Object.keys(array.length > 0 ? array[0] : {});

    pdf.autoTable({
      head: [headerKeys],
      body: array.map((row) => headerKeys.map((key) => row[key])),
    });
    pdf.save('csv_data.pdf');
  };

  const headerKeys = Object.keys(array.length > 0 ? array[0] : {});

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>REACTJS CSV</h1>
      <form>
        <input
          type={'file'}
          id={'csvFileInput'}
          accept={'.csv'}
          onChange={handleOnChange}
        />

        <button onClick={handleOnSubmit}>IMPORT CSV</button>

        <button onClick={generatePDF}>Download PDF</button>
      </form>

      <br />

      <table>
        <thead>
          <tr key={'header'}>
            {headerKeys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item, index) => (
            <tr key={index}>
              {headerKeys.map((key, idx) => (
                <td key={idx}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
