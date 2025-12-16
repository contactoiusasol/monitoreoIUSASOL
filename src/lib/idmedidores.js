import axios from 'axios';
import { TOKEN } from 'src/config/token';

// Endpoints
const urlBase = 'https://api.iusasol.mx/v2.1/api/Reports/ISOL/Meters';
const urlMedidor = 'https://monitor.iusasol.mx/v2.1/api/Reports/ISOL/Meter/nickname';

const comp_any = "IUSASOL SUMINISTRADORA ENERGIA";

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': 'https://api.iusasol.mx',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache'
}

const params = { company: comp_any };

export default async function fetchMeters() {
  try {
    const res = await axios.get(urlBase, { params, headers });
    const meters = res.data && res.data.meters ? res.data.meters : [];
    return meters;
  } catch (error) {
    console.error('Error en la solicitud => ', error);
    throw error;
  }
}
