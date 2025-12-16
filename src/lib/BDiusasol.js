// Ruta del archivo CSV dentro de tu proyecto
const csvFilePath = '/MedidoresMonitoreo.csv';

// Función para leer el archivo CSV y mostrarlo en la tabla HTML
function readCSV(file) {
    const reader = new FileReader();

    // Función que se ejecutará cuando termine de leer el archivo
    reader.onload = function(event) {
        const csv = event.target.result;
        const data = parseCSV(csv);

        // Llamar a la función para mostrar los datos en la tabla
        displayDataInTable(data);
    };

    // Leer el archivo como texto
    reader.readAsText(file);
}

// Función para convertir el CSV en un array de objetos
function parseCSV(csv) {
    const lines = csv.split('\n');
    const result = [];

    // Obtener las cabeceras (primeras líneas del CSV)
    const headers = lines[0].split(',');

    // Iterar por cada línea del CSV y crear un objeto con los datos
    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');

        if (currentLine.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];
            }
            result.push(obj);
        }
    }

    return result;
}

// Función para mostrar los datos en la tabla HTML
function displayDataInTable(data) {
    const table = document.getElementById('csvTable');

    // Crear la cabecera de la tabla
    const headers = Object.keys(data[0]);
    let headerRow = '<tr>';
    for (let header of headers) {
        headerRow += `<th>${header}</th>`;
    }
    headerRow += '</tr>';

    // Crear las filas de datos
    let dataRows = '';
    for (let row of data) {
        dataRows += '<tr>';
        for (let header of headers) {
            dataRows += `<td>${row[header]}</td>`;
        }
        dataRows += '</tr>';
    }

    // Mostrar los datos en la tabla
    table.innerHTML = headerRow + dataRows;
}

// Leer el archivo CSV al cargar la página
fetch(csvFilePath)
    .then(response => response.text())
    .then(csvData => {
        const file = new File([csvData], 'MedidoresMonitoreo.csv');
        readCSV(file);
    })
    .catch(error => {
        console.error('Error al leer el archivo CSV:', error);
    });