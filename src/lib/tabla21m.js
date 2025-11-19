import { TOKEN as token } from '../config/token';

const urlBase = 'https://api.iusasol.mx/v2.1/api/Farm/Meter/Profiles';
const API_KEY = token;

const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': 'https://api.iusasol.mx',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
};

// Obtener referencia al botón y al datepicker
const btnEnviar = document.getElementById("btnEnviar");
const datepicker = document.getElementById("datepicker");

// Agregar evento click al botón
btnEnviar.addEventListener("click", function () {
    // Obtener la fecha seleccionada del datepicker
    const fechaSeleccionada = datepicker.value;
    const tableBody = document.getElementById('tabla-datos').getElementsByTagName('tbody')[0];
    
    // Limpiar la tabla antes de agregar nuevos datos
    tableBody.innerHTML = '';

    // Crear array de promesas para todos los IDs (1-21)
    const requests = Array.from({ length: 21 }, (_, i) => {
        const id = i + 1;
        const params = { id, date: fechaSeleccionada, periodicity: 0 };
        
        return axios.get(urlBase, { params, headers })
            .then(res => ({
                id,
                data: res.data.profiles,
                success: true
            }))
            .catch(err => ({
                id,
                data: [],
                success: false,
                error: err.message
            }));
    });

    // Procesar todas las solicitudes en paralelo
    Promise.all(requests).then(results => {
        // Ordenar resultados por ID
        results.sort((a, b) => a.id - b.id);
        
        const failedMegas = []; // IDs de megas sin datos
        const allData = [];     // Almacenar todos los datos para procesamiento
        const generacionTotal = {}; // Objeto para almacenar la generación total por mega
        
        // Procesar cada resultado
        results.forEach(result => {
            // Registrar megas fallidos o sin datos
            if (result.data.length === 0) {
                failedMegas.push(result.id);
                generacionTotal[result.id] = 0; // Generación total = 0
            } else {
                // Calcular generación total para este mega
                generacionTotal[result.id] = result.data.reduce(
                    (sum, profile) => sum + (parseFloat(profile.channels) || 0, 0
                ));
            }
            allData.push(result.data);
        });
        
        // 1. Mostrar alerta si hay megas sin datos
        if (failedMegas.length > 0) {
            alert(`⚠️ Los siguientes megas no tienen datos: ${failedMegas.join(', ')}`);
        }
        
        // 2. Detectar megas con baja generación
        const generacionValues = Object.values(generacionTotal);
        const maxGeneracion = Math.max(...generacionValues);
        
        const lowGeneratingMegas = [];
        for (const [id, generacion] of Object.entries(generacionTotal)) {
            // Evitar división por cero y considerar solo megas con datos
            if (maxGeneracion > 0 && generacion < maxGeneracion * 0.1) {
                lowGeneratingMegas.push(id);
            }
        }
        
        if (lowGeneratingMegas.length > 0) {
            alert(`⚠️ ¡ATENCIÓN! Los siguientes megas están generando menos del 10% con respecto al mega más productivo: ${lowGeneratingMegas.join(', ')}`);
        }
        
        // 3. Construir tabla
        const maxRows = Math.max(...allData.map(data => data.length));
        
        for (let i = 0; i < maxRows; i++) {
            const newRow = tableBody.insertRow();
            let timeValue = "NA"; // Valor por defecto para tiempo
            
            // Buscar el primer valor de tiempo válido para esta fila
            for (const data of allData) {
                if (data[i] && data[i].time) {
                    timeValue = data[i].time;
                    break;
                }
            }
            
            // Agregar celda de tiempo
            const timeCell = newRow.insertCell();
            timeCell.textContent = timeValue;
            
            // Agregar celdas de datos
            allData.forEach(data => {
                const cell = newRow.insertCell();
                if (data[i] && data[i].channels !== undefined) {
                    cell.textContent = data[i].channels;
                } else {
                    cell.textContent = "NA"; // Marcar dato faltante
                }
            });
        }
    }).catch(error => {
        console.error("Error en las solicitudes:", error);
    });
});

// Agregar evento click al botón de descarga
const btnDescargar = document.getElementById("btnDescargar");
btnDescargar.addEventListener("click", function() {
  // Crear un nuevo libro de Excel
  const workbook = XLSX.utils.book_new();

  // Obtener los datos de la tabla
  const table = document.getElementById("tabla-datos");

  // Convertir la tabla a un objeto de hoja de cálculo de Excel
  const worksheet = XLSX.utils.table_to_sheet(table);

  // Agregar la hoja de cálculo al libro de Excel
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte 21 Megas");

  // Guardar el libro de Excel como archivo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(data);

  // Crear un enlace de descarga y simular un clic para descargar el archivo
  const link = document.createElement("a");
  link.href = url;
  link.download = "Reporte 21 Megas.xlsx";
  link.click();

  // Liberar el objeto URL creado
  URL.revokeObjectURL(url);
});