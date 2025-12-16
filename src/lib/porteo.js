import axios from 'axios';
import { TOKEN } from 'src/config/token';

const urlBase = 'https://api.iusasol.mx/v2.1/api/Reports/Porteo/Meters';
const comp_any = 'IUSASOL SUMINISTRADORA ENERGIA';

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': 'https://api.iusasol.mx',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache'
};

const params = { company: comp_any };

export default async function fetchPorteoMeters() {
  try {
    const res = await axios.get(urlBase, { params, headers });
    return res.data && res.data.meters ? res.data.meters : [];
  } catch (err) {
    console.error('Error en la solicitud => ', err);
    throw err;
  }
}
